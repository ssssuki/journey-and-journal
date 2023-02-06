import "./App.css";
import { Route , Routes } from "react-router-dom";

import { useEffect } from 'react';
import axios from 'axios';

// Pages
import Home from "./pages/Home";

function App() {

  return <div className="App">
    Home
    <Routes>
      <Route
        exact path="/"
        element={<Home />}>
      </Route>
    </Routes>
  </div>;
}

export default App;
