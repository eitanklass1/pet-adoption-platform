const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const PetModel = require("./models/petsModel");
const UserModel = require("./models/usersModel");

const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/users", userRoutes);
app.use("/pets", petRoutes);

async function init() {
  try {
    const client = new MongoClient(process.env.MongoDB_uri);
    PetModel.passConnection(client);
    UserModel.passConnection(client);
    if (client) {
      app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

init();
