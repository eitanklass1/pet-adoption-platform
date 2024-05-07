import React, { createContext, useState } from "react";

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  function adoptionStatusColor(status) {
    switch (status) {
      case "Adopted":
        return "#0A3696";
      case "Fostered":
        return "#4D3290";
      case "Available":
        return "#238E6D";
    }
  }

  return (
    <PetContext.Provider value={{ adoptionStatusColor }}>
      {children}
    </PetContext.Provider>
  );
};
