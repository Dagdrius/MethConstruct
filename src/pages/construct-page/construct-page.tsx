import React, { useState } from "react";

// import educData from "./educData.json"

import "./construct-page.css";

type rowData = {
  id: number;
  programm: string;
  recYear: number;
  educDir: string;
};

const ConstructPage: React.FC = () => {
  return (
    <div className="educ-page">
      <h1>This is a future construct page!</h1>
    </div>
  );
};

export default ConstructPage;
