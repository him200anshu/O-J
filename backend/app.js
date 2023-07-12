const express = require("express");
const router = express.Router();
const { userdata } = require("./mongo");
const cors = require("cors");
const { generateFile, createInput } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Welcome to the homepage");
});

app.post("/api/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const inPath = await createInput(input);
    console.log(filePath);
    console.log(inPath);
    const output = await executeCpp(filePath, inPath);

    res.json({ output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdata.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({ status: "success", email: user.email });
      } else {
        res.json({ status: "incorrect_password" });
      }
    } else {
      res.json({ status: "notexist" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "fail", message: "An error occurred while processing your request." });
  }
});

app.get("/api/otp-store", (req, res) => {
  res.json(otpStore);
});

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await userdata.findOne({ email: email });

    if (check) {
      res.json({ status: "exist" });
    } else {
      await userdata.create(data);
      res.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail" });
  }
});

// Store generated OTPs in memory (for demonstration purposes only, not suitable for production)
const otpStore = {};
app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userdata.findOne({ email });

    if (user) {
      // Email exists in the database
      res.json({ exists: true });
    } else {
      // Email does not exist in the database
      res.json({ exists: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while checking the email." });
  }
});


// Endpoint for sending OTP
app.post("/api/send-otp", (req, res) => {
  const { email } = req.body;

  // Generate OTP (you can use any method to generate OTP)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store OTP in memory (replace with database or cache storage in production)
  otpStore[email] = otp;

  console.log("Generated OTP:", otp);

  // Send OTP via email
  sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    });
});

// Endpoint for verifying OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Get stored OTP from memory (replace with database or cache retrieval in production)
  const storedOtp = otpStore[email];
  console.log("Entered OTP:", otp);
  console.log("Stored OTP:", storedOtp);
  if (storedOtp && storedOtp.toString().trim() === otp.toString().trim()) {
    // Valid OTP
    // Clear stored OTP (replace with deletion from database or cache in production)
    delete otpStore[email];

    res.status(200).json({ success: true });
  } else {
    // Invalid OTP
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

// Function to send email
async function sendEmail(to, subject, text) {
  // Configure nodemailer with your Gmail account details
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "him2004anshu@gmail.com",
      pass: "daugwcxeicbnljwf",
    },
  });

  // Prepare email options
  const mailOptions = {
    from: "sender@example.com",
    to,
    subject,
    text,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

const port = 8001;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
