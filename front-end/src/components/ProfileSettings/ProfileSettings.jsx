import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

export const ProfileSettings = () => {
  const { userToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileId, setProfileId] = useState("");

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response);
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoneNumber(response.data.phoneNumber);
      setProfileId(response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleSaveChanges(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${profileId}`,
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
    <div id="edit-profile-form" className="form-modal">
      <form onSubmit={handleSaveChanges}>
        <h2>Profile Settings</h2>
        <label id="edit-profile-email-label" className="form-label">
          Email
        </label>
        <input
          id="edit-profile-email"
          className="form-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div id="edit-profile-full-name">
          <label id="edit-profile-first-name-label" className="form-label">
            First Name
          </label>
          <input
            id="edit-profile-first-name"
            className="form-input"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label id="edit-profile-last-name-label" className="form-label">
            Last Name
          </label>
          <input
            id="edit-profile-last-name"
            className="form-input"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <label id="edit-profile-phone-num-label" className="form-label">
          Phone number
        </label>
        <input
          id="edit-profile-phone-num"
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
