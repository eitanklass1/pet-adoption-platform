import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { PetCard } from "../../PetCard/PetCard";
import "./UserPetsPage.css";
import { useParams } from "react-router-dom";

export const UserPetsPage = () => {
  const { userToken } = useContext(UserContext);
  const { userId } = useParams();

  const [usersPetsArray, setUsersPetsArray] = useState([]);
  const [savedPetsArray, setSavedPetsArray] = useState([]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pets/user/${id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setUsersPetsArray(response.data.usersPets);
      setSavedPetsArray(response.data.savedPets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [savedPetsArray]);

  return (
    <div id="other-user-pets-modal">
      <h3>Adopted or fostered</h3>
      {usersPetsArray.map((eachPet) => {
        return (
          <div className="pet-columns">
            <PetCard pet={eachPet} />
          </div>
        );
      })}
      <h3>Saved pets</h3>
      {savedPetsArray.map((eachPet) => {
        return (
          <div className="pet-columns">
            <PetCard pet={eachPet} />
          </div>
        );
      })}
    </div>
  );
};
