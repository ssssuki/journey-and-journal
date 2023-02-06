import "./App.css";
import { Route , Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

function App() {

  return <div className="App">
    Home
    <Routes>
      <Route
        exact path="/"
        element={<HomePage />}>
      </Route>
    </Routes>
  </div>;
}

export default App;
