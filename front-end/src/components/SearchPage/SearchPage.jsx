import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./SearchPage.css";
import { PetCard } from "../../PetCard/PetCard";
import searchIcon from "../../assets/search-svgrepo-com.svg";
import { UserContext } from "../../context/UserProvider";

export const SearchPage = () => {
  const { isSavedArray, getSavedBy } = useContext(UserContext);

  const [advancedSearch, setAdvancedSearch] = useState(true);

  const [petTypeBasic, setPetTypeBasic] = useState("");

  const [petTypeAdv, setPetTypeAdv] = useState("");
  const [petAdoptionAdv, setPetAdoptionStatusAdv] = useState("");
  const [petHeightAdv, setPetHeightAdv] = useState("");
  const [petWeightAdv, setPetWeightAdv] = useState(0);
  const [petNameAdv, setPetNameAdv] = useState("");

  const [resultsList, setResultsList] = useState([]);
  const [noResults, setNoResults] = useState(false);

  async function handleBasicSearch(e) {
    e.preventDefault();
    try {
      const basicSearchQuery = {
        petType: petTypeBasic,
      };
      const response = await axios.get("http://localhost:8080/pets/search", {
        params: basicSearchQuery,
      });
      setResultsList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdvSearch(e) {
    e.preventDefault();
    try {
      const advSearchQuery = {
        petType: petTypeAdv,
        adoptionStatus: petAdoptionAdv,
        petHeight: Number(petHeightAdv),
        petWeight: Number(petWeightAdv),
        petName: petNameAdv,
      };

      const response = await axios.get("http://localhost:8080/pets/search", {
        params: advSearchQuery,
      });
      setResultsList(response.data);
      if (resultsList.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (resultsList.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    const fetchSavedData = async () => {
      await getSavedBy();
    };

    fetchSavedData();
  }, [resultsList]);

  return (
    <div id="search-modal">
      <h2>Search for your next pet!</h2>
      <div id="search-header">
        <div id="search-header-basic">
          <h4>Basic</h4>
        </div>
        <div id="search-header-switch">
          <label class="switch">
            <input
              type="checkbox"
              checked={advancedSearch}
              onChange={() => setAdvancedSearch(!advancedSearch)}
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div id="search-header-advanced">
          <h4>Advanced</h4>
        </div>
      </div>
      {advancedSearch ? (
        <div id="adv-search-modal">
          <form onSubmit={handleAdvSearch}>
            <div id="pet-name-container">
              <input
                id="adv-pet-name"
                value={petNameAdv}
                placeholder="Type a name here"
                onChange={(e) => {
                  setPetNameAdv(e.target.value);
                }}
              />
            </div>
            <div id="pet-type-status-container">
              <select
                name="adv-pet-type-search-dropdown"
                id="adv-pet-type-search-dropdown"
                value={petTypeAdv}
                onChange={(e) => {
                  setPetTypeAdv(e.target.value);
                }}
              >
                <option value="" disabled>
                  Pick a type
                </option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
              <select
                name="adv-adoption-status-dropdown"
                id="adv-adoption-status-dropdown"
                value={petAdoptionAdv}
                onChange={(e) => {
                  setPetAdoptionStatusAdv(e.target.value);
                }}
              >
                <option value="">Pick adoption status</option>
                <option value="Adopted">Adopted</option>
                <option value="Fostered">Fostered</option>
                <option value="Available">Available</option>
              </select>
            </div>
            <div id="pet-phys-atr-container">
              <select
                name="adv-pet-height-dropdown"
                id="adv-pet-height-dropdown"
                value={petHeightAdv}
                onChange={(e) => {
                  setPetHeightAdv(e.target.value);
                }}
              >
                <option value="">Select height</option>
                <option value={30}>Short</option>
                <option value={55}>Medium</option>
                <option value={80}>Tall</option>
              </select>
              <select
                name="adv-pet-weight-dropdown"
                id="adv-pet-weight-dropdown"
                value={petWeightAdv}
                onChange={(e) => {
                  setPetWeightAdv(e.target.value);
                }}
              >
                <option value="">Select weight</option>
                <option value={20}>Small</option>
                <option value={40}>Medium</option>
                <option value={60}>Large</option>
              </select>
            </div>
            <button className="search-btn">
              <img src={searchIcon} />
            </button>
          </form>
        </div>
      ) : (
        <div id="basic-search-modal">
          <form onSubmit={handleBasicSearch}>
            <select
              name="basic-pet-type-search-dropdown"
              id="basic-pet-type-search-dropdown"
              value={petTypeBasic}
              onChange={(e) => {
                setPetTypeBasic(e.target.value);
              }}
            >
              <option value="" disabled>
                Pick a type
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
            <div>
              <button className="search-btn">
                <img src={searchIcon} />
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="results-container">
        {noResults && (
          <div id="no-results-msg">
            Sorry we don't have any pets that fit your search criteria!
          </div>
        )}
        {resultsList.map((result) => {
          const isPetSaved = isSavedArray.includes(result._id);
          return (
            <div className="pet-columns">
              <PetCard pet={result} isPetSaved={isPetSaved} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
