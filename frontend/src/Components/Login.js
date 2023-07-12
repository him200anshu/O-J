import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const { status, email: userEmail } = response.data;

      if (status === "success") {
        navigate("/home", { state: { email: userEmail } });
      } else if (status === "notexist") {
        setErrorMessage("User has not signed up.");
      } else if (status === "incorrect_password") {
        setErrorMessage("Incorrect email or password.");
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while processing your request.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">
      <button style={{ backgroundColor: "green", color: "white" }}>
        Signup
        </button>
        </Link>

        <Link to="/forgotpassword">
      <button style={{ backgroundColor: "green", color: "white" }}>
        ForgotPassword!
        </button>
        </Link>
    </div>
  );
}

export default Login;
