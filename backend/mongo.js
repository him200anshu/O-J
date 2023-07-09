const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://adminn:adminn123@cluster0.7eucdjx.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userdata = mongoose.model("userdata", userSchema);


const ojProblemSchema = new mongoose.Schema({
  problemId: {
    type: Number,
    required: true,
    unique: true,
  },
  problemDetails: {
    type: String,
    required: true,
  },
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
    },
  ],
});

const Ojproblem = mongoose.model('Ojproblem', ojProblemSchema);

const saveExampleProblem = () => {
  const exampleProblem = new Ojproblem({
    problemId: 1,
    title: "Example Problem",
    description: "This is an example problem",
    problemDetails: "Details of the example problem", // Include the problem details
    testCases: [
      {
        input: "Input 1",
        expectedOutput: "Output 1",
      },
      {
        input: "Input 2",
        expectedOutput: "Output 2",
      },
    ],
  });

  exampleProblem
    .save()
    .then((savedProblem) => {
      console.log("Example problem saved:", savedProblem);
    })
    .catch((err) => {
      console.error("Error saving example problem:", err);
    });
};

saveExampleProblem();


module.exports = Ojproblem;

module.exports = {
    userdata: userdata,
  };