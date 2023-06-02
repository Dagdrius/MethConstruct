import React, { useState, ReactElement, FormEvent } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, FormControl } from "@mui/material";
import { useMultiStepForm } from "../../components/customHooks/useMultiStepForm";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useLocation } from "react-router-dom";
import { TitleForm } from "./formPages/TitleForm";
import { AgreementForm } from "./formPages/AgreementForm";
import { GoalsForm } from "./formPages/GoalsForm";
import { OpopPlaceForm } from "./formPages/OpopPlaceForm";
import { CompetencyForm } from "./formPages/CompetencyForm";

import "./construct-page.css";

type TCompetency = {
  id: string;
  code: string;
  name: string;
  achievementIndicators: TAchievementIndicator[];
};
type TAchievementIndicator = {
  id: string;
  code: string;
  wording: string;
  knowledge?: string;
  skill?: string;
  mastery?: string;
};

type FormData = {
  rpdName: string;
  direction: string;
  code: string;
  educLvl: string;
  educForm: string;
  year: string;
  protocol: string;
  date: string;
  surname: string;
  name: string;
  fName: string;
  goals: string;
  tasks: string;
  objectives: string;
  disciplinePlace: string;
  semester: string | number;
  course: string | number;
  competencies: TCompetency[];
};

const ConstructPage: React.FC = () => {
  const location = useLocation();
  const formValues = location.state?.formValues || {};

  const INITIAL_DATA: FormData = {
    rpdName: formValues.name,
    direction: formValues.direction,
    code: formValues.dirCode,
    educLvl: formValues.educationLevel,
    educForm: formValues.educationForm,
    year: new Date().getFullYear().toString(),
    protocol: "",
    date: "",
    surname: "",
    name: "",
    fName: "",
    goals: "",
    tasks: "",
    objectives: "",
    disciplinePlace: "",
    semester: 1,
    course: "",
    competencies: [], // Add an empty array for competencies
  };

  const [data, setData] = useState(INITIAL_DATA);
  const steps = [
    {
      component: TitleForm,
      title: "Титульный лист",
    },
    {
      component: AgreementForm,
      title: "Лист согласования",
    },
    {
      component: GoalsForm,
      title: "Цели, задачи",
    },
    {
      component: OpopPlaceForm,
      title: "Место дисциплины в структуре ОПОП",
    },
    {
      component: CompetencyForm,
      title: "Компетенции",
    },
  ];

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    goToStep,
    back,
    next,
  } = useMultiStepForm(
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
            sx={{ paddingRight: "8px" }}
          >
            <Paper sx={{ minWidth: "150px", p: "8px 16px 8px 16px " }}>
              <Box display="flex" justifyContent="center">
                <Stepper activeStep={currentStepIndex} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={index} onClick={() => goToStep(index)}>
                      <StepLabel style={{ cursor: "pointer" }}>
                        {step.title}
                      </StepLabel>
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
                        Назад
                      </Button>
                    )}
                    {
                      <Button type="submit" variant="outlined">
                        {isLastStep ? "Закончить" : "Вперед"}
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
