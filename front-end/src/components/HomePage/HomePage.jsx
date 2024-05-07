import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import "./HomePage.css";

export const HomePage = () => {
  const { userToken, firstName, lastName } = useContext(UserContext);

  return (
    <div id="home-page">
      {userToken ? (
        <h2 id="welcome">
          Welcome {firstName} {lastName}!
        </h2>
      ) : (
        <div>
          <h2>Welcome to Pet site</h2>
          <p>Here you can find and adopt your favorite pets</p>
        </div>
      )}
      <a href="/search">
        <button className="button1">Find pets</button>
      </a>
    </div>
  );
};
