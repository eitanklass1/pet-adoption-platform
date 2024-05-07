const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function passwordMatch(req, res, next) {
  const { password, rePassword } = req.body;
  if (password === rePassword) {
    next();
  } else {
    res.status(400).send("Passwords don't match!");
  }
}

async function isNewUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      res.status(400).send("User already exists");
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send("Error fetching user"); // Is this the correct Error code?
  }
}

async function isExistingUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      req.body.user = user;
      next();
    } else {
      res.status(400).send("User doesn't exists");
    }
  } catch (error) {
    res.status(500).send("Error checking user");
  }
}

async function updateIsExistingUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await UserModel.getUserByEmail(email);
    const isSameUser = email == user.email;
    if (user && !isSameUser) {
      res.status(400).send("User already exists");
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send("Error checking user");
  }
}

// For Admin API routes -- MAKE SURE IT IS CORRECT
function isAdmin(req, res, next) {
  try {
    if (req.user.admin === 1) {
      next();
    } else {
      res.status(403).send("Forbidden access");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function hashPwd(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (error, hash) {
    if (error) {
      return res.status(500).send("Error hashing");
    }
    req.body.password = hash;
    delete req.body.rePassword;

    next();
  });
}

// ADD THIS IS WHEN YOU WANT TO PROTECT API ROUTES
function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Must have authorzation headers");
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECTRET_KEY, function (error, decoded) {
    if (error) {
      return res.status(401).send("Invalid token");
    }
    if (decoded) {
      req.body.userId = decoded._id;
      next();
    }
  });
}

module.exports = {
  passwordMatch,
  isNewUser,
  isExistingUser,
  isAdmin,
  hashPwd,
  auth,
  updateIsExistingUser
};
