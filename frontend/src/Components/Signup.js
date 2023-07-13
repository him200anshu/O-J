import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8002/signup", {
        email,
        password,
      });

      const { status } = response.data;

      if (status === "exist") {
        setErrorMessage("User already exists");
      } else if (status === "success") {
        navigate("/home", { state: { email } });
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while processing your request.");
    }
  }

  return (
    <div className="signup">
      <h1>Signup</h1>

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
        <input type="submit" value="Signup" />
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <br />
      <p>OR</p>
      <br />

      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;
