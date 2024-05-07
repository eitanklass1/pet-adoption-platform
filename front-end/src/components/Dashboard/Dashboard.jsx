import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { UsersTable } from "./UsersTable";
import { PetsTable } from "./PetsTable";

export const Dashboard = () => {
  const [usersList, setUsersList] = useState([]);
  const [petsList, setPetsList] = useState([]);

  const fetchUsers = async () => {
    try {
      const respose = await axios.get("http://localhost:8080/users");
      setUsersList(respose.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPets = async () => {
    try {
      const respose = await axios.get("http://localhost:8080/pets");
      setPetsList(respose.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPets();
  }, []);

  return (
    <div id="dashboards">
      <h2>Dashboard</h2>
      <h3 id="users-table-title" className="table-title">
        Users
      </h3>
      <UsersTable usersList={usersList} />
      <h3 id="pets-table-title" className="table-title">
        Pets
      </h3>
      <PetsTable petsList={petsList} />
      <a href="/dashboard/add-pet">
          <button className="button3">Add pet</button>
      </a>
    </div>
  );
};
