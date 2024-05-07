import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserProvider";
import { PetCard } from "../../PetCard/PetCard";
import "./MyPets.css";

export const MyPets = () => {
  const { userToken, isSavedArray, getSavedBy } = useContext(UserContext);
  const [savedPetsArray, setSavedPetsArray] = useState([]);
  const [usersPetsArray, setUsersPetsArray] = useState([]);

  const [savedPetsToggle, setSavedPetsToggle] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/pets/my-pets/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUsersPetsArray(response.data.usersPets);
      setSavedPetsArray(response.data.savedPets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    const fetchSavedData = async () => {
      await getSavedBy();
    };
    fetchSavedData();
  }, [savedPetsArray]);

  const handleToggleChange = (event) => {
    const value = event.target.value === "saved";
    setSavedPetsToggle(value);
  };

  return (
    <div id="my-pets-modal">
      <h2>My Pets</h2>
      <div class="switch-field">
        <input
          type="radio"
          id="radio-one"
          name="switch-one"
          value="your-pets"
          onClick={handleToggleChange}
          checked={savedPetsToggle}
        />
        <label for="radio-one">Your Pets</label>
        <input
          type="radio"
          id="radio-two"
          name="switch-one"
          value="saved"
          onClick={handleToggleChange}
          checked={!savedPetsToggle}
        />
        <label for="radio-two">Saved Pets</label>
      </div>
      {savedPetsToggle ? (
        <div id="saved-pets-container">
          {savedPetsArray.length === 0 ? (
            <div>No saved pets!</div>
          ) : (
            <div className="results-container">
              {savedPetsArray.map((result) => {
                const isPetSaved = isSavedArray.includes(result._id);
                return (
                  <div className="pet-columns">
                    <PetCard pet={result} isPetSaved={isPetSaved} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div id="users-pets-container">
          {usersPetsArray.length === 0 ? (
            <div>No adopted/fostered pets!</div>
          ) : (
            <div className="results-container">
              {usersPetsArray.map((result) => {
                const isPetSaved = isSavedArray.includes(result._id);
                return (
                  <div className="pet-columns">
                    <PetCard pet={result} isPetSaved={isPetSaved} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
