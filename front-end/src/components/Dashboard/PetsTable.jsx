import React from "react";

export const PetsTable = ({ petsList }) => {
  return (
    <table id="pets-table" className="table">
      <thead>
        <tr>
          <th>Pet ID</th>
          <th>Pet Name</th>
          <th>Adoption Status</th>
          <th>Pet Type</th>
          <th>Edit Pet</th>
        </tr>
      </thead>
      <tbody>
        {petsList.map((pet) => {
          return (
            <tr>
              <td>{pet._id}</td>
              <td>{pet.petName}</td>
              <td>{pet.adoptionStatus}</td>
              <td>{pet.petType}</td>
              <a href={`/pets/edit-pet/${pet._id}`}>
                <td>
                  <button className="table-edit-button">Edit</button>
                </td>
              </a>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
