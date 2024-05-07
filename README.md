# Pet Adoption Platform

Welcome to my Pet Adoption Platform. This project was created to hone my full-stack development skills, incorporating Node.js, Express.js, React.js, and MongoDB. Below you'll find an overview of the features, technologies used, and how to set up and run the application.

## Technologies Used
- **Node.js**: Backend runtime environment for running JavaScript code.
- **Express.js**: Web application framework for building APIs and handling HTTP requests.
- **React.js**: Frontend library for building user interfaces with reusable components.
- **MongoDB**: NoSQL database for storing pet and user data in a flexible JSON-like format.
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>

## Features
### User Management
- **Registration**: Users can sign up for an account by providing basic information.
- **Login/Logout**: Registered users can log in securely to access the platform's features and log out when they're done.
- **Authentication**: Authentication mechanisms are in place to ensure the security of user data and actions.
### Pet Adoption
- **Browse Pets**: Users can browse through a list of available pets up for adoption.
- **Search and Filter**: Users can search for specific pets or filter them based on criteria such as species, age, or location.
-  **Pet Details**: Each pet has a detailed profile showcasing information like breed, age, personality, and adoption status.
### Dashboard
- **User Dashboard**: Registered users have access to a personalized dashboard where they can manage their profile, view their adopted pets, and track their favorite pets.
- **Admin Dashboard**: Administrators have special privileges to manage pets available for adoption and handle user accounts.

## Getting Started
Follow these instructions to get the Pet Adoption Platform up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or access to a MongoDB instance

### Installation

1. Clone the repository to your local machine:
```
https://github.com/eitanklass1/pet-adoption-platform.git
```

2. Navigate to the project directory:
```
cd pet-adoption-platform
```

3. Install dependencies for both backend and frontend:
```
cd backend && npm install
cd ../frontend && npm install
```

4. Set up environment variables:
- Create a .env file in the backend directory.
```
PORT = 8080
MongoDB_uri =

TOKEN_SECTRET_KEY = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
```

## Running the Application
1. Start the backend server:
```
cd backend && nodemon server.js
```
2. Start the frontend development server:
bash
Copy code
```
cd frontend && npm start
```
3. Access the application in your web browser at `http://localhost:8080`.

## Authors

Contributors names and contact info

ex. [Eitan Klass](https://www.linkedin.com/in/eitan-klass/)
