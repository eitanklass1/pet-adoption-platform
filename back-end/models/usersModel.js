const { ObjectId } = require("mongodb");

let usersCollection;

class UserModel {
  static async passConnection(client) {
    usersCollection = client.db("pets_projectDB").collection("users");
  }

  static async getUserByEmail(email) {
    try {
      const user = await usersCollection.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsers() {
    try {
      const users = await usersCollection.find().toArray();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(userId) {
    try {
      const specificUser = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return specificUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async editUser(userId, editedData) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const editedUser = usersCollection.findOneAndUpdate(
        filter,
        { $set: editedData },
        { returnDocument: "after" }
      );
      const getEditedUser = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return getEditedUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async addUser(newUser) {
    try {
      const inserted = await usersCollection.insertOne(newUser);
      if (inserted.acknowledged) {
        const user = await usersCollection.findOne({
          _id: inserted.insertedId,
        });
        user._id = inserted.insertedId;
        console.log(
          `A document was inserted with the _id: ${inserted.insertedId}`
        );
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async fosterPet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const userAfterUpdate = await usersCollection.findOneAndUpdate(
        filter,
        { $addToSet: { fosteredPets: petId } },
        { returnDocument: "after" }
      );
      const getFosteredPets = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return getFosteredPets.fosteredPets;
    } catch (error) {
      console.log(error);
    }
  }

  static async adoptPet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const userAfterUpdate = await usersCollection.findOneAndUpdate(
        filter,
        { $addToSet: { adoptedPets: petId } },
        { returnDocument: "after" }
      );
      const getAdoptedPets = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return getAdoptedPets.adoptedPets;
    } catch (error) {
      console.log(error);
    }
  }

  static async removePet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const user = await usersCollection.findOne(filter);

      if (!user) {
        return null;
      }

      const adoptionStatus = user.adoptedPets.includes(petId)
        ? "Adopted"
        : "Fostered";

      const update = {};

      if (adoptionStatus === "Adopted") {
        update.$pull = { adoptedPets: petId };
      } else if (adoptionStatus === "Fostered") {
        update.$pull = { fosteredPets: petId };
      }
      const userAfterUpdate = await usersCollection.findOneAndUpdate(
        filter,
        update,
        { returnDocument: "after" }
      );
      return userAfterUpdate;
    } catch (error) {
      console.log(error);
    }
  }

  static async savePet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const userAfterUpdate = await usersCollection.findOneAndUpdate(
        filter,
        { $addToSet: { savedPets: petId } },
        { returnDocument: "after" }
      );
      const getSavedPets = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return getSavedPets.savedPets;
    } catch (error) {
      console.log(error);
    }
  }

  static async unsavePet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(userId) };
      const userAfterUpdate = await usersCollection.findOneAndUpdate(
        filter,
        { $pull: { savedPets: petId } },
        { returnDocument: "after" }
      );
      const getSavedPets = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      return getSavedPets.savedPets;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserModel;
