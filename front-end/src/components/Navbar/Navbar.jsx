import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "./Navbar.css";
import logo from "../../assets/pawfect-logo.svg";
import settings from "../../assets/settings-svgrepo-com.svg";

export const Navbar = () => {
  const { firstName, userToken, setUserToken, isAdmin } =
    useContext(UserContext);

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.clear();
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          {userToken ? (
            <div className="nav-elements">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/my-pets">My pets</NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile-settings">
                    <div id="align-profile">
                      <span>{firstName}'s Profile</span>
                      <img src={settings} alt="" />
                    </div>
                  </NavLink>
                </li>
                {userToken && (
                  <li>
                    <button className="button2" onClick={handleLogOut}>
                      Log out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div id="logged-out-nav">
              <a href="/login">
                <button className="button1" style={{ pointerEvents: "none" }}>
                  Login
                </button>
              </a>
              <a href="/sign-up">
                <button className="button2" style={{ pointerEvents: "none" }}>
                  Sign up
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
