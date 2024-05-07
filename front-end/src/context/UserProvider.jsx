import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || null
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin"),
    false
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || ""
  );

  const [isSavedArray, setIsSavedArray] = useState([]);

  async function getSavedBy() {
    try {
      const response = await axios.get("http://localhost:8080/pets/saved-by", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setIsSavedArray(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSavedBy()
  }, [isSavedArray])

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        isAdmin,
        setIsAdmin,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        isSavedArray,
        getSavedBy,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
