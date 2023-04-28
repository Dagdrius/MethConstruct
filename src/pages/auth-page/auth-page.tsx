import React from "react";
import AuthForm from "./auth-form";

import "./auth-page.css";

const AuthPage: React.FC = () => {
  // let userIsRegistered = true;

  return (
    <div className="auth-page">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
