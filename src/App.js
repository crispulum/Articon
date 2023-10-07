import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home.jsx";
import "../client/styles.css";


const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />}></Route>
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