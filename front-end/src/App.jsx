import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { SignUp } from "./components/SignUp/SignUp";
import { Login } from "./components/Login/Login";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { HomePage } from "./components/HomePage/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { PrivateRoute } from "./private-router/PrivateRouter";
import { MyPets } from "./components/MyPets/MyPets";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AddPet } from "./components/AddPet/AddPet";
import { EditUserPage } from "./components/EditUserPage/EditUserPage";
import { PetPage } from "./components/PetPage/PetPage";
import "./App.css";
import { EditPetPage } from "./components/EditPetPage/EditPetPage";
import { UserPetsPage } from "./components/UserPetsPage/UserPetsPage";

function App() {
  const serverURL = "http://localhost:8080";

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route index element={<HomePage />} />
          <Route
            path="/profile-settings"
            element={
              <PrivateRoute>
                <ProfileSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-pets"
            element={
              <PrivateRoute>
                <MyPets />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-pets/:petId"
            element={
              <PrivateRoute>
                <PetPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/add-pet"
            element={
              <PrivateRoute>
                <AddPet />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <EditUserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users-pets/:userId"
            element={
              <PrivateRoute>
                <UserPetsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/:petId"
            element={
              <PrivateRoute>
                <PetPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/edit-pet/:petId"
            element={
              <PrivateRoute>
                <EditPetPage />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
