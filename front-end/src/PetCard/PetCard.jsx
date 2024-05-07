import React, { useContext, useEffect, useState } from "react";
import petTypeImg from "../../src/assets/dog-svgrepo-com.svg";
import petWeightImg from "../../src/assets/weight-scale-svgrepo-com.svg";
import petHeightImg from "../../src/assets/ruler-svgrepo-com.svg";
import infoImg from "../../src/assets/info-svgrepo-com.svg";
import saveImg from "../../src/assets/red-heart-svgrepo-com.svg";
import unsaveImg from "../../src/assets/red-heart-outline-svgrepo-com.svg";
import "./PetCard.css";
import { PetContext } from "../context/PetProvider";
import axios from "axios";
import { UserContext } from "../context/UserProvider";

export const PetCard = ({ pet, isPetSaved }) => {
  const { adoptionStatusColor } = useContext(PetContext);
  const { userToken } = useContext(UserContext);
  const {
    _id,
    petType,
    petName,
    adoptionStatus,
    petPicture,
    petHeight,
    petWeight,
  } = pet;

  const [saved, setSaved] = useState(isPetSaved)

  const handleSave = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/pets/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsave = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/pets/${id}/unsave`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id={`${_id}`} className="pet-card">
      <div className="card-picture">
        <img src={petPicture} />
      </div>
      <div className="card-pet-header">
        <div className="card-pet-name">
          <h4 className="card-pet-name-content">{petName}</h4>
        </div>
        <div className="card-pet-status">
          <h5 className="card-pet-status-content">
            <span
              style={{
                color: adoptionStatusColor(adoptionStatus),
                background: `${adoptionStatusColor(adoptionStatus)}30`,
                borderRadius: "4px",
                padding: "0.1rem 0.3rem",
              }}
            >
              {adoptionStatus}
            </span>
          </h5>
        </div>
      </div>
      <div className="card-pet-tags">
        <div className="type-tag">
          <img src={petTypeImg} />
          Type: <span style={{ fontWeight: 600 }}> {petType}</span>
        </div>
        <div className="weight-tag">
          <img src={petWeightImg} />
          Weight: <span style={{ fontWeight: 600 }}>{petWeight} kg</span>
        </div>
        <div className="height-tag">
          <img src={petHeightImg} />
          Height: <span style={{ fontWeight: 600 }}>{petHeight} cm</span>
        </div>
      </div>
      <div className="card-buttons">
        <a href={`/pets/${_id}`}>
          <button className="see-more">
            <span style={{ fontWeight: 600 }}>See more</span>
            <img src={infoImg} />
          </button>
        </a>
        {userToken && (
          <>
            {saved ? (
              <button className="save-button" onClick={() => {handleUnsave(_id); setSaved(!saved)}}>
                <img src={unsaveImg} />
                Unsave
              </button>
            ) : (
              <button className="save-button" onClick={() => {handleSave(_id); setSaved(!saved)}}>
                <img src={saveImg} />
                Save
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
