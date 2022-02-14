import React from "react";
import LoginPage from "./components/LoginPage";
import MainContent from "./components/MainContent";
import RegisterPage from "./components/RegisterPage";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
