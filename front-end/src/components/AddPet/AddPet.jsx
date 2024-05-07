import axios from "axios";
import React, { useState } from "react";
import "./AddPet.css";

export const AddPet = () => {
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [petPicture, setPetPicture] = useState();
  const [petHeight, setPetHeight] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petBio, setPetBio] = useState("");
  const [petHypo, setPetHypo] = useState("");
  const [petDietary, setPetDietary] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [savedBy, setSavedBy] = useState([]);
  const [owner, setOwner] = useState("");

  async function handleAddPet(e) {
    e.preventDefault();

    const petData = new FormData();

    petData.append("petPicture", petPicture);
    petData.append("petType", petType);
    petData.append("petName", petName);
    petData.append("adoptionStatus", adoptionStatus);
    petData.append("petHeight", petHeight);
    petData.append("petWeight", petWeight);
    petData.append("petColor", petColor);
    petData.append("petBio", petBio);
    petData.append("petHypo", petHypo);
    petData.append("petDietary", petDietary);
    petData.append("petBreed", petBreed);
    petData.append("savedBy", JSON.stringify(savedBy));
    petData.append("owner", owner);

    try {
      const response = await axios.post("http://localhost:8080/pets", petData);
      if (response.status === 200) {
        setPetType("");
        setPetName("");
        setAdoptionStatus("");
        setPetPicture("");
        setPetHeight("");
        setPetWeight("");
        setPetColor("");
        setPetBio("");
        setPetHypo("");
        setPetDietary("");
        setPetBreed("");
        setOwner("");
        setSavedBy([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="add-pet-form" className="form-modal">
      <form onSubmit={handleAddPet}>
        <h2>Add pet</h2>
        <p>
          All field are <span style={{ color: "red" }}>required</span>!
        </p>
        <label id="pet-type-label" className="form-label">
          Dog or Cat
        </label>
        <select
          name="pet-type-dropdown"
          id="pet-type-dropdown"
          className="form-input"
          value={petType}
          onChange={(e) => {
            setPetType(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <label id="pet-name-label" className="form-label">
          Name
        </label>
        <input
          id="pet-name"
          className="form-input"
          value={petName}
          onChange={(e) => {
            setPetName(e.target.value);
          }}
          required
        />
        <label id="adoption-status-label" className="form-label">
          Adoption Status
        </label>
        <select
          name="adoption-status-dropdown"
          id="adoption-status-dropdown"
          className="form-input"
          value={adoptionStatus}
          onChange={(e) => {
            setAdoptionStatus(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fostered</option>
          <option value="Available">Available</option>
        </select>
        <label id="picture-label" className="form-label">
          Picture
        </label>
        <input
          id="pet-picture"
          type="file"
          name="petPicture"
          onChange={(e) => {
            setPetPicture(e.target.files[0]);
          }}
        />
        <label id="pet-height-label" className="form-label">
          Height
        </label>
        <input
          type="number"
          id="pet-height"
          className="form-input"
          value={petHeight}
          onChange={(e) => {
            setPetHeight(e.target.value);
          }}
          required
        />
        <label id="pet-weight-label" className="form-label">
          Weight
        </label>
        <input
          type="number"
          id="pet-weight"
          className="form-input"
          value={petWeight}
          onChange={(e) => {
            setPetWeight(e.target.value);
          }}
          required
        />
        <label id="pet-color-label" className="form-label">
          Color
        </label>
        <input
          id="pet-color"
          className="form-input"
          value={petColor}
          onChange={(e) => {
            setPetColor(e.target.value);
          }}
          required
        />
        <label id="pet-bio-label" className="form-label">
          Bio
        </label>
        <input
          id="pet-bio"
          className="form-input"
          value={petBio}
          onChange={(e) => {
            setPetBio(e.target.value);
          }}
        />
        <label id="pet-hypoallergenic-label" className="form-label">
          Hypoallergenic
        </label>
        <select
          name="pet-hypoallergenic-dropdown"
          id="pet-hypoallergenic-dropdown"
          className="form-input"
          value={petHypo}
          onChange={(e) => {
            setPetHypo(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label id="pet-dietary-label" className="form-label">
          Dietary Restrictions
        </label>
        <input
          id="pet-dietary"
          className="form-input"
          value={petDietary}
          onChange={(e) => {
            setPetDietary(e.target.value);
          }}
          required
        />
        <label id="pet-breed-label" className="form-label">
          Breed
        </label>
        <input
          id="pet-breed"
          className="form-input"
          value={petBreed}
          onChange={(e) => {
            setPetBreed(e.target.value);
          }}
          required
        />
        <button className="button1">Add pet</button>
      </form>
    </div>
  );
};
