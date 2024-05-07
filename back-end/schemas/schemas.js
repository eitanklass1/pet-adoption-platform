const Ajv = require("ajv");
const ajv = new Ajv();

const petSchema = {
  type: "object",
  properties: {
    petType: { type: "string" },
    petName: { type: "string" },
    adoptionStatus: { type: "string" },
    petPicture: { type: "string" },
    petHeight: { type: "string" },
    petWeight: { type: "string" },
    petColor: { type: "string" },
    petBio: { type: "string" },
    petHypo: { type: "string" },
    petDietary: { type: "string" },
    petBreed: { type: "string" },
    owner: { type: "string" },
  },
  required: [
    "petType",
    "petName",
    "adoptionStatus",
    "petHeight",
    "petWeight",
    "petColor",
    "petHypo",
    "petDietary",
    "petBreed",
    "owner",
  ],
  additionalProperties: true,
};

const editPetSchema = {
  type: "object",
  properties: {
    petType: { type: "string" },
    petName: { type: "string" },
    adoptionStatus: { type: "string" },
    petPicture: { type: "string" },
    petHeight: { type: "number" },
    petWeight: { type: "string" },
    petColor: { type: "string" },
    petBio: { type: "string" },
    petHypo: { type: "string" },
    petDietary: { type: "string" },
    petBreed: { type: "string" },
  },
  required: [
    "petType",
    "petName",
    "adoptionStatus",
    "petHeight",
    "petWeight",
    "petColor",
    "petHypo",
    "petDietary",
    "petBreed",
  ],
  additionalProperties: false,
};

const signUpSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      description: "Must be a valid email address",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: {
      type: "string",
      description:
        "Must contain at least 1 number, 1 special character; and a minimum of 8 characters",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
    },
    rePassword: {
      type: "string",
      description: "Passwords must match",
    },
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    phoneNumber: {
      type: "string",
      description: "Must be a valid phone number",
      pattern: "^\\+?[0-9-]+$",
      minLength: 9,
    },
    isAdmin: { type: "boolean" },
    savedPets: { type: "array" },
    adoptedPets: { type: "array" },
    fosteredPets: { type: "array" },
  },
  required: [
    "email",
    "password",
    "rePassword",
    "firstName",
    "lastName",
    "phoneNumber",
    "isAdmin",
    "savedPets",
    "adoptedPets",
    "fosteredPets",
  ],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    isAdmin: { type: "boolean" },
  },
  required: ["email", "password", "isAdmin"],
  additionalProperties: false,
};

const editUserSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      description: "Must be a valid email address",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    phoneNumber: {
      type: "string",
      description: "Must be a valid phone number",
      pattern: "^\\+?[0-9-]+$",
      minLength: 9,
    },
  },
  required: ["email", "firstName", "lastName", "phoneNumber"],
  additionalProperties: false,
};

module.exports = {
  petSchema,
  signUpSchema,
  loginSchema,
  editUserSchema,
  editPetSchema,
};
