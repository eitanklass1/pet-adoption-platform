const express = require("express");
const UsersController = require("../controllers/usersController");
const { validateBody } = require("../middleware/validateBody");
const {
  signUpSchema,
  loginSchema,
  editUserSchema,
} = require("../schemas/schemas");
const {
  passwordMatch,
  isNewUser,
  isExistingUser,
  hashPwd,
  updateIsExistingUser,
} = require("../middleware/authMiddleware");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", auth, UsersController.getUserById);
router.get("/", UsersController.getAllUsers);

router.put(
  "/:id",
  validateBody(editUserSchema),
  updateIsExistingUser,
  UsersController.editUser
);

router.post(
  "/sign-up",
  validateBody(signUpSchema),
  passwordMatch,
  isNewUser,
  hashPwd,
  UsersController.signUp
);

router.post(
  "/login",
  validateBody(loginSchema),
  isExistingUser,
  UsersController.login
);

module.exports = router;
