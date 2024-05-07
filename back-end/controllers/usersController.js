const UserModel = require("../models/usersModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const user = await UserModel.addUser(req.body);
    res.send({ ok: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function login(req, res) {
  const { password, user } = req.body;

  try {
    bcrypt.compare(password, user.password, function (error, result) {
      if (error) {
        return res.status(400).send("Incorrect password");
      }
      if (result) {
        const token = jwt.sign(
          { _id: user._id, isAdmin: user.isAdmin },
          process.env.TOKEN_SECTRET_KEY,
          { expiresIn: "1h" }
        );
        res.send({
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        }); // Better way of sending isAdmin?
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getUserById(req, res) {
  try {
    let id;
    if (req.params.id !== "undefined") {
      id = req.params.id;
    } else {
      id = req.body.userId;
    }

    const specificUser = await UserModel.getUserById(id);
    res.send(specificUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function editUser(req, res) {
  try {
    const { id } = req.params;
    const editUser = await UserModel.editUser(id, req.body);
    res.status(201).send(editUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { signUp, login, getAllUsers, getUserById, editUser };
