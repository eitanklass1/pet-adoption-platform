import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    const newUser = {
      email,
      password,
      rePassword,
      firstName,
      lastName,
      phoneNumber,
      isAdmin: false,
      savedPets: [],
      adoptedPets: [],
      fosteredPets: [],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/users/sign-up",
        newUser
      );
      if (response.data.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data == "Passwords don't match!") {
        setErrorMessage("Passwords don't match");
      }
      if (error.response.data == "User already exists") {
        setErrorMessage("User already exists");
      }
      switch (error.response.data.instancePath) {
        case "/email":
          setErrorMessage("Please enter a valid email");
          break;
        case "/password":
          setErrorMessage(
            "Password should have at least 1 number, 1 special character, and a minimum of 8 characters"
          );
          break;
        case "/firstName":
          setErrorMessage("Please enter your first name");
          break;
        case "/lastName":
          setErrorMessage("Please enter your last name");
          break;
        case "/phoneNumber":
          setErrorMessage("Please enter a valid phone number");
          break;
      }
    }
  }

  return (
    <div id="sign-up-form" className="form-modal">
      <form onSubmit={handleSignUp}>
        <h2>Create a new account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label id="sign-up-email-label" className="form-label">
          Email
        </label>
        <input
          id="sign-up-email"
          className="form-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label id="sign-up-password-label" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="sign-up-password"
          className="form-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label id="sign-up-repassword-label" className="form-label">
          Re-enter password
        </label>
        <input
          type="password"
          id="sign-up-repassword"
          className="form-input"
          value={rePassword}
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
        />
        <div id="sign-up-full-name">
          <label id="sign-up-first-name-label" className="form-label">
            First Name
          </label>
          <input
            id="sign-up-first-name"
            className="form-input"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label id="sign-up-last-name-label" className="form-label">
            Last Name
          </label>
          <input
            id="sign-up-last-name"
            className="form-input"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <label id="sign-up-phone-num-label" className="form-label">
          Phone number
        </label>
        <input
          id="sign-up-phone-num"
          className="form-input"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button className="button1" style={{ marginTop: "1rem" }}>
          Sign Up
        </button>
      </form>
      <div>
        <p id="go-to-login">
          Already have an account?{" "}
          <span>
            <a href="/login">Login here</a>
          </span>
        </p>
      </div>
    </div>
  );
};
