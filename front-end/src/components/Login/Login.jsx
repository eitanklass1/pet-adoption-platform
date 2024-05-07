import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUserToken, setIsAdmin, setFirstName, setLastName } =
    useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
        isAdmin: false,
      });
      if (response.data.token) {
        console.log(response.data);
        setUserToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setIsAdmin(response.data.isAdmin);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        setFirstName(response.data.firstName);
        localStorage.setItem("firstName", response.data.firstName);
        setLastName(response.data.lastName);
        localStorage.setItem("lastName", response.data.lastName);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
    <div id="login-form" className="form-modal">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label id="login-email-label" className="form-label">
          Email
        </label>
        <input
          id="login-email"
          className="form-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label id="login-password-label" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          className="form-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="button2" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>
      <div>
        <p id="go-to-sign-up">
          Need an acount?{" "}
          <span>
            <a href="/sign-up">Sign up here</a>
          </span>
        </p>
      </div>
    </div>
  );
};
