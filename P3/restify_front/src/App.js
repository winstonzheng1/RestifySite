import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import {useState} from "react";
import {APIContext} from "./Contexts/APIContext"
import Router from "./components/Routers"

function App() {
  return (
        <Router/>
  );
}

export default App;
