import React from "react";

export const UsersTable = ({ usersList }) => {
  return (
    <table id="users-table" className="table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
          <th>Admin Status</th>
          <th>Edit User</th>
          <th>User's Pets</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => {
          return (
            <tr>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <a href={`/users/${user._id}`}>
                  <button className="table-edit-button">Edit</button>
                </a>
              </td>
              <td>
                <a href={`/users-pets/${user._id}`}>
                  <button className="table-edit-button">All Pets</button>
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
