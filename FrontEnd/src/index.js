import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import Profile from "./Profile";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {<Profile />}
  </React.StrictMode>
);


