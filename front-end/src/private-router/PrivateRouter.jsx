import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

export const PrivateRoute = ({ children }) => {
  const { userToken } = useContext(UserContext);

  return <div>{userToken ? children : <Navigate to="/login" />}</div>;
};
