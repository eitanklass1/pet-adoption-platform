const express = require("express");
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../middleware/validateBody");
const { upload } = require("../middleware/imagesMiddleware");
const {
  filterSearch,
  changeToAdoptedStatus,
  changeToFosteredStatus,
  changeToAvailableStatus,
  addOwner,
  clearOwner,
} = require("../middleware/petsMiddleware");
const { auth } = require("../middleware/authMiddleware");
const { petSchema, editPetSchema } = require("../schemas/schemas");
const router = express.Router();

router.get("/search", filterSearch, PetsController.searchPets);

router.get("/my-pets", auth, PetsController.getMyPets);
router.get("/user/:id", auth, PetsController.getPetsByUserId);

router.get("/saved-by", auth, PetsController.savedBy);

router.get("/:id", PetsController.getPetById);

router.get("/", PetsController.getAllPets);
router.post(
  "/",
  upload.single("petPicture"),
  validateBody(petSchema),
  PetsController.addPet
);

router.put("/:id", validateBody(editPetSchema), PetsController.editPet);

router.post("/:id/save", auth, PetsController.savePet);
router.post("/:id/unsave", auth, PetsController.unsavePet);

router.put(
  "/:id/foster",
  auth,
  changeToFosteredStatus,
  addOwner,
  PetsController.fosterPetUser
);

router.put(
  "/:id/adopt",
  auth,
  changeToAdoptedStatus,
  addOwner,
  PetsController.adoptPetUser
);

router.delete(
  "/:id/return",
  auth,
  clearOwner,
  changeToAvailableStatus,
  PetsController.removePetUser
);

module.exports = router;
