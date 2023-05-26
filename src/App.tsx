import React from "react";
import AuthPage from "./pages/auth-page";
import EducPage from "./pages/educ-page";
import ConstructPage from "./pages/construct-page";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/educ-plans" element={<EducPage />} />
        <Route path="/constructor" element={<ConstructPage />} />
      </Routes>
    </div>
  );
  // return (
  //   <div className="App">
  //     {/* <AuthPage /> */}
  //     {/* <RegForm /> */}
  //   </div>
  // );
}

export default App;
