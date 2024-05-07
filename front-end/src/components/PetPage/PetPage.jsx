import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "./PetPage.css";
import { PetContext } from "../../context/PetProvider";
import petTypeImg from "../../assets/dog-svgrepo-com.svg";
import petWeightImg from "../../assets/weight-scale-svgrepo-com.svg";
import petHeightImg from "../../assets/ruler-svgrepo-com.svg";
import saveImg from "../../assets/red-heart-svgrepo-com.svg";
import unsaveImg from "../../assets/red-heart-outline-svgrepo-com.svg";

export const PetPage = () => {
  const { userToken, isSavedArray } = useContext(UserContext);
  const { adoptionStatusColor } = useContext(PetContext);
  const { petId } = useParams();

  const [petData, setPetData] = useState({});
  const { adoptionStatus } = petData;

  const fetchPetData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/pets/${id}`);
      setPetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdoptedStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pets/${id}/adopt`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setPetData((prevData) => ({ ...prevData, adoptionStatus: "Adopted" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFosterStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pets/${id}/foster`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setPetData((prevData) => ({ ...prevData, adoptionStatus: "Fostered" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async (id) => {
    try {
      const respose = await axios.delete(
        `http://localhost:8080/pets/${id}/return`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setPetData((prevData) => ({ ...prevData, adoptionStatus: "Available" }));
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchPetData(petId);
  }, [petId, adoptionStatus]);

  return (
    <>
      <div className="detailed-pet-card">
        <div className="detailed-card-picture">
          <img src={petData.petPicture} />
        </div>
        <div className="detailed-pet-card-right">
          <div className="detailed-card-info">
            <div className="detailed-card-header">
              <h3 className="detailed-card-pet-name-content">
                Hi my name is {petData.petName}! I'm
              </h3>
              <h5 className="detailed-card-pet-status-content">
                <span
                  style={{
                    color: adoptionStatusColor(petData.adoptionStatus),
                    background: `${adoptionStatusColor(
                      petData.adoptionStatus
                    )}30`,
                    borderRadius: "4px",
                    padding: "0.1rem 0.3rem",
                    fontSize: "1rem",
                  }}
                >
                  {petData.adoptionStatus}
                </span>
              </h5>
            </div>
            <div></div>
            <div className="detailed-card-pet-tags">
              <div className="type-tag">
                <img src={petTypeImg} />
                Type:{" "}
                <span style={{ fontWeight: 600 }}> {petData.petType}</span>
              </div>
              <div className="weight-tag">
                <img src={petWeightImg} />
                Weight:{" "}
                <span style={{ fontWeight: 600 }}>{petData.petWeight} kg</span>
              </div>
              <div className="height-tag">
                <img src={petHeightImg} />
                Height:{" "}
                <span style={{ fontWeight: 600 }}>{petData.petHeight} cm</span>
              </div>
              <div className="breed-tag">
                Breed:{" "}
                <span style={{ fontWeight: 600 }}> {petData.petBreed}</span>
              </div>
              <div className="color-tag">
                Color:{" "}
                <span style={{ fontWeight: 600 }}> {petData.petColor}</span>
              </div>
              <div className="dietary-tag">
                Dietary:{" "}
                <span style={{ fontWeight: 600 }}> {petData.petDietary}</span>
              </div>
              <div className="hyopallergic-tag">
                Hyopallergic:{" "}
                <span style={{ fontWeight: 600 }}> {petData.petHypo}</span>
              </div>
            </div>
          </div>
          <div className="detailed-card-buttons">
            {adoptionStatus !== "Adopted" && (
              <button
                className="button1"
                onClick={() => handleAdoptedStatus(petId)}
              >
                Adopt
              </button>
            )}
            {(adoptionStatus === "Adopted" ||
              adoptionStatus === "Fostered") && (
              <button className="button3" onClick={() => handleReturn(petId)} å>
                Return me
              </button>
            )}
            {adoptionStatus === "Available" && (
              <button
                className="button2"
                onClick={() => handleFosterStatus(petId)}
              >
                Foster me
              </button>
            )}
            {isSavedArray.includes(petId) ? (
              <button
                className="save-button"
                onClick={() => handleUnsave(petId)}
              >
                <img src={unsaveImg} />
                Unsave
              </button>
            ) : (
              <button className="save-button" onClick={() => handleSave(petId)}>
                <img src={saveImg} />
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bio-section">
        <h4>A little bit about me...</h4>
        <p>{petData.petBio}</p>
      </div>
    </>
  );
};
