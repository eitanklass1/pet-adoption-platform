const PetModel = require("../models/petsModel");
const UserModel = require("../models/usersModel");

async function getAllPets(req, res) {
  try {
    const pets = await PetModel.getAllPets();
    res.send(pets);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function getPetById(req, res) {
  try {
    const { id } = req.params;
    const specificPet = await PetModel.getPetById(id);
    res.send(specificPet);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function getPetsByUserId(req, res) {
  try {
    const { id } = req.params;
    const user = await PetModel.getPetsByUserId(id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function getMyPets(req, res) {
  try {
    const { userId } = req.body;
    const user = await PetModel.getMyPets(userId);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function addPet(req, res) {
  req.body.petPicture = req.file.path;
  req.body.savedBy = JSON.parse(req.body.savedBy);
  try {
    const newPet = await PetModel.addPet(req.body);
    res.send(newPet);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function searchPets(req, res) {
  try {
    const searchResult = await PetModel.searchPets(req.query);
    res.send(searchResult);
  } catch (error) {
    console.log(error);
  }
}

async function fosterPetUser(req, res) {
  try {
    const fosteredPet = await UserModel.fosterPet(
      req.body.userId,
      req.params.id
    );
    res.send(fosteredPet);
  } catch (error) {
    console.log(error);
  }
}

async function adoptPetUser(req, res) {
  try {
    const adoptedPet = await UserModel.adoptPet(req.body.userId, req.params.id);
    res.send(adoptedPet);
  } catch (error) {
    console.log(error);
  }
}

async function removePetUser(req, res) {
  try {
    const removedPet = await UserModel.removePet(
      req.body.userId,
      req.params.id
    );
    res.send(removedPet);
  } catch (error) {
    console.log(error);
  }
}

async function savePet(req, res) {
  try {
    const savePetToUser = await UserModel.savePet(
      req.body.userId,
      req.params.id
    );
    const saveUserToPet = await PetModel.savePet(
      req.body.userId,
      req.params.id
    );
  } catch (error) {
    console.log(error);
  }
}

async function unsavePet(req, res) {
  try {
    const unsavePetToUser = await UserModel.unsavePet(
      req.body.userId,
      req.params.id
    );
    const unsaveUserToPet = await PetModel.unsavePet(
      req.body.userId,
      req.params.id
    );
  } catch (error) {
    console.log(error);
  }
}

async function savedBy(req, res) {
  try {
    const getAllSavedByPetsIds = await PetModel.savedBy(req.body.userId);
    res.send(getAllSavedByPetsIds);
  } catch (error) {
    console.log(error);
  }
}

async function editPet(req, res) {
  try {
    const { id } = req.params;
    const editPet = await PetModel.editPet(id, req.body);
    res.status(201).send(editPet);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllPets,
  getPetById,
  addPet,
  searchPets,
  adoptPetUser,
  fosterPetUser,
  removePetUser,
  savePet,
  editPet,
  getPetsByUserId,
  unsavePet,
  savedBy,
  getMyPets,
};
