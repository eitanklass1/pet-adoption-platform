import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "./EditUserPage.css";

export const EditUserPage = () => {
  const { userToken } = useContext(UserContext);
  const { userId } = useParams();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoneNumber(response.data.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  async function handleSaveChanges(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userId}`,
        {
          email,
          firstName,
          lastName,
          phoneNumber,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="edit-user-form" className="form-modal">
      <form onSubmit={handleSaveChanges}>
        <h2>Edit Account</h2>
        <label id="edit-email-label" className="form-label">
          Email
        </label>
        <input
          id="edit-email"
          className="form-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="edit-full-name">
          <label id="edit-first-name-label" className="form-label">
            First Name
          </label>
          <input
            id="edit-first-name"
            className="form-input"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label id="edit-last-name-label" className="form-label">
            Last Name
          </label>
          <input
            id="edit-last-name"
            className="form-input"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <label id="edit-phone-num-label" className="form-label">
          Phone number
        </label>
        <input
          id="edit-phone-num"
          className="form-input"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button className="button1" style={{ marginTop: "1rem" }}>
          Save Edits
        </button>
      </form>
    </div>
  );
};
