import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css';


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  async function sendOtp() {
    try {
      const response = await axios.post("http://localhost:8001/check-email", {
        email,
      });
  
      const { exists } = response.data;
  
      if (exists) {
        // Email exists in the database, proceed to send OTP
        try {
          const otpResponse = await axios.post("http://localhost:8001/send-otp", {
            email,
          });
  
          // Handle the OTP response here, such as checking for errors or success
          // You may need to modify the response format based on your server implementation
  
          setOtpSent(true);
        } catch (otpError) {
          console.log(otpError);
          setErrorMessage("An error occurred while sending the OTP.");
        }
      } else {
        // Email does not exist in the database
        setErrorMessage("User has not registered.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while checking the email.");
    }
  }
  
  async function verifyOtp() {
    try {
      const response = await axios.post("http://localhost:8001/verify-otp", {
        email,
        otp,
      });

      // Handle the response, such as checking for errors and validating the OTP
      // You may need to modify the response format based on your server implementation

      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  }

  return (
    <div className="forgot-password-container">
    <h1>Forgot Password</h1>

    {!otpSent ? (
      <div>
        <p>Enter your email to receive an OTP:</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={sendOtp}>Send OTP</button>
      </div>
    ) : (
      <div>
        <p>An OTP has been sent to your email. Please enter it below:</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
        />
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    )}

    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </div>
  );
}

export default ForgotPassword;
