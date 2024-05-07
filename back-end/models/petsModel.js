const { ObjectId } = require('mongodb');
const { petSchema } = require('../schemas/schemas');

let petsCollection;
let usersCollection;

class PetModel {
  
  static async passConnection(client) {
    petsCollection = client.db('pets_projectDB').collection('pets')
    usersCollection = client.db('pets_projectDB').collection('users')
  }

  static async getAllPets() {
    try {
      const allPets = await petsCollection.find().toArray()
      return allPets
    } catch (error) {
      console.log(error)
    }
  }

  static async getPetById(petId) {
    try {
      const specificPet = await petsCollection.findOne({ _id: new ObjectId(petId) })
      return specificPet
    } catch (error) {
      console.log(error)
    }
  }

  static async getPetsByUserId (id) {
    try {
      const usersPets = await petsCollection.find({ owner: id }).toArray();
      const savedPets = await petsCollection.find({ savedBy: { $in: [id] } }).toArray();
      return { usersPets, savedPets }
    } catch (error) {
      console.log(error)
    }
  }

  static async getMyPets (userId) {
    try {
      const usersPets = await petsCollection.find({ owner: userId }).toArray();
      const savedPets = await petsCollection.find({ savedBy: { $in: [userId] } }).toArray();
      return { usersPets, savedPets }
    } catch (error) {
      console.log(error)
    }
  }

  static async addPet(pet) {
    try {
      pet.petHeight = Number(pet.petHeight)
      pet.petWeight = Number(pet.petWeight)
      const inserted = await petsCollection.insertOne(pet);
      if (inserted.acknowledged) {
        const pet = await petsCollection.findOne({ _id: inserted.insertedId })
        pet._id = inserted.insertedId
        console.log(`A document was inserted with the _id: ${inserted.insertedId}`);
        return pet
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async editPet(petId, editedData) {
    try {
      const filter = { _id: new ObjectId(petId) }
      const editedPet = petsCollection.findOneAndUpdate(
        filter,
        { $set: editedData },
        { returnDocument: 'after' }
      )
      const getEditedPet = await petsCollection.findOne({ _id: new ObjectId(petId) });
      return getEditedPet
    } catch (error) {
      console.log(error)
    }
  }

  static async changeToAdoptedStatus(petId) {
    try {
      const updatedPet = await petsCollection.findOneAndUpdate(
        { _id: new ObjectId(petId) },
        { $set: { adoptionStatus: "Adopted" } },
        { returnDocument: "after" }
      );
      return updatedPet;
    } catch (error) {
      console.log(error)
    }
  }

  static async changeToFosteredStatus(petId) {
    try {
      const updatedPet = await petsCollection.findOneAndUpdate(
        { _id: new ObjectId(petId) },
        { $set: { adoptionStatus: "Fostered" } },
        { returnDocument: "after" }
      );
      return updatedPet;
    } catch (error) {
      console.log(error)
    }
  }

  static async changeToAvailableStatus(petId) {
    try {
      const updatedPet = await petsCollection.findOneAndUpdate(
        { _id: new ObjectId(petId) },
        { $set: { adoptionStatus: "Available" } },
        { returnDocument: "after" }
      );
      return updatedPet;
    } catch (error) {
      console.log(error)
    }
  }

  static async addOwner(petId, userId) {
    try {
      const updatedPet = await petsCollection.findOneAndUpdate(
        { _id: new ObjectId(petId) },
        { $set: { owner: userId } },
        { returnDocument: "after" }
      );
      return updatedPet;
    } catch (error) {
      console.log(error)
    }
  }

  static async clearOwner(petId) {
    try {
      const updatedPet = await petsCollection.findOneAndUpdate(
        { _id: new ObjectId(petId) },
        { $set: { owner: null } },
        { returnDocument: "after" }
      );
      return updatedPet;
    } catch (error) {
      console.log(error)
    }
  }

  static async searchPets(queryParams) {
    try {
      const searchResults = await petsCollection.find(queryParams).toArray()
      return searchResults
    } catch (error) {
      console.log(error)
    }
  }

  static async savePet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(petId) }
      const petAfterUpdate = await petsCollection.findOneAndUpdate(
        filter,
        { $addToSet: { savedBy: userId } },
        { returnDocument: 'after' }
      )
      const getSavedBy = await petsCollection.findOne({ _id: new ObjectId(petId) });
      return getSavedBy.savedBy
    } catch (error) {
      console.log(error)
    }
  }

  static async unsavePet(userId, petId) {
    try {
      const filter = { _id: new ObjectId(petId) }
      const petAfterUpdate = await petsCollection.findOneAndUpdate(
        filter,
        { $pull: { savedBy: userId } },
        { returnDocument: 'after' }
      )
      const getSavedBy = await petsCollection.findOne({ _id: new ObjectId(petId) });
      return getSavedBy.savedBy
    } catch (error) {
      console.log(error)
    }
  }

  static async savedBy(userId) {
    const savedPets = await petsCollection.find({ savedBy: { $in: [userId] } }).toArray();
    let savedPetsId = []
    for (let i  = 0; i < savedPets.length; i++) {
      savedPetsId.push(savedPets[i]._id)
    }
    return savedPetsId
  }
}

module.exports = PetModel