import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { PetProvider } from './context/PetProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <PetProvider>
        <App />
      </PetProvider>
    </UserProvider>
  </BrowserRouter>
);
