import React from "react";
import AuthPage from "./pages/auth-page/auth-page";
import EducPage from "./pages/educ-page/educ-page";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/educ-plans" element={<EducPage />} />
    </Routes>
  );
  // return (
  //   <div className="App">
  //     {/* <AuthPage /> */}
  //     {/* <RegForm /> */}
  //   </div>
  // );
}

export default App;
