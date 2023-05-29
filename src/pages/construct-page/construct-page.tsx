import React, { useState, ReactElement, FormEvent } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, FormControl } from "@mui/material";
import { useMultiStepForm } from "../../components/customHooks/useMultiStepForm";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { UserForm } from "./formPages/UserForm";
import { AgreementForm } from "./formPages/AgreementForm";

import "./construct-page.css";
import { set } from "react-hook-form";

type FormData = {
  code: string;
  spec: string;
  recYear: string;
  disc: string;
  prog: string;
  protocol: string;
  surname: string;
  name: string;
  fName: string;
};
//code, spec, recYear, Disc, prog, protoc, sur, name, fName
const INITIAL_DATA: FormData = {
  code: "",
  spec: "",
  recYear: "",
  disc: "",
  prog: "",
  protocol: "",
  surname: "",
  name: "",
  fName: "",
};
const ConstructPage: React.FC = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const steps = [
    {
      component: UserForm,
      title: "Титульный лист",
    },
    {
      component: AgreementForm,
      title: "Лист согласования",
    },
  ];

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm(
      steps.map((step) => (
        <step.component {...data} updateFields={updateFields} />
      ))
    );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    console.log(data);
  }

  return (
    <div className="construct-page">
      <div className="padClass">
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            justifyContent="center"
            sx={{ paddingRight: "16px" }}
          >
            <Paper sx={{ minWidth: "150px" }}>
              <Box display="flex" justifyContent="center">
                <Stepper activeStep={currentStepIndex} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step.title}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Paper>
          </Box>

          <Box flexGrow={1}>
            <Paper>
              <form onSubmit={onSubmit} className="construct-form">
                <FormControl style={{ width: "100%" }}>
                  <div className="stepClass">
                    <Typography variant="subtitle1">
                      {currentStepIndex + 1} / {steps.length}
                    </Typography>
                  </div>

                  {step}
                  <div className="stepButton">
                    {!isFirstStep && (
                      <Button variant="outlined" type="button" onClick={back}>
                        Back
                      </Button>
                    )}
                    {
                      <Button type="submit" variant="outlined">
                        {isLastStep ? "Finish" : "Next"}
                      </Button>
                    }
                  </div>
                </FormControl>
              </form>
            </Paper>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ConstructPage;
