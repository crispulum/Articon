import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LandingPages from "./components/LandingPages.jsx";
import "../client/styles.css";



const App = () => (
  <div className="App">
    <Routes>
      <Route path="*" element={<LandingPages />}></Route>
    </Routes>
  </div>
  );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);