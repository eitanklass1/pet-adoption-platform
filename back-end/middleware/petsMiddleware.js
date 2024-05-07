const PetModel = require("../models/petsModel");
const UserModel = require("../models/usersModel");

function filterSearch(req, res, next) {
  for (let key in req.query) {
    if (req.query[key] === "" || req.query[key] === "0") {
      delete req.query[key];
    }
  }
  if (req.query.petName) {
    req.query.petName = { $regex: req.query.petName, $options: "i" };
  }
  if (req.query.petHeight) {
    req.query.petHeight = { $lt: Number(req.query.petHeight) };
  }
  if (req.query.petWeight) {
    req.query.petWeight = { $lt: Number(req.query.petWeight) };
  }
  next();
}

async function changeToAdoptedStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pet = await PetModel.changeToAdoptedStatus(id);
    next();
  } catch (error) {
    res.status(500).send("Error changing to adopted status");
  }
}

async function changeToFosteredStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pet = await PetModel.changeToFosteredStatus(id);
    next();
  } catch (error) {
    res.status(500).send("Error changing to fostered status");
  }
}

async function changeToAvailableStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pet = await PetModel.changeToAvailableStatus(id);
    next();
  } catch (error) {
    res.status(500).send("Error changing to available status");
  }
}

async function addOwner(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Use req.body for userId
    const pet = await PetModel.addOwner(id, userId);
    next();
  } catch (error) {
    res.status(500).send("Error adding owner");
  }
}

async function clearOwner(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Use req.body for userId
    const pet = await PetModel.clearOwner(id, userId);
    next();
  } catch (error) {
    res.status(500).send("Error adding owner");
  }
}

module.exports = {
  filterSearch,
  changeToAdoptedStatus,
  changeToFosteredStatus,
  changeToAvailableStatus,
  addOwner,
  clearOwner,
};
