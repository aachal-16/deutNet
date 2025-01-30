import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import PropertyDetailPage from "./PropertyDetailPage";
import useProperties from "./customhook/useProperties"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  //default values to be empty
  const { properties, loading, availableLocations } = useProperties("", "", "");


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage properties={properties} loading={loading} availableLocations={availableLocations} />}
        />
        <Route
          path="/property/:id"
          element={<PropertyDetailPage properties={properties} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
