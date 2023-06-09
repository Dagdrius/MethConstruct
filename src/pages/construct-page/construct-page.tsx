import React, { useState, ReactElement, FormEvent } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, FormControl } from "@mui/material";
import { useMultiStepForm } from "../../components/customHooks/useMultiStepForm";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { TitleForm } from "./formPages/TitleForm";
import { AgreementForm } from "./formPages/AgreementForm";
import { GoalsForm } from "./formPages/GoalsForm";
import { OpopPlaceForm } from "./formPages/OpopPlaceForm";
import { CompetencyForm } from "./formPages/CompetencyForm";
import { DiscSizeForm } from "./formPages/DiscSizeForm";
import { DiscContentForm } from "./formPages/DiscContentForm";
import { EducMethSupportForm } from "./formPages/EducMethSupportForm";
import { EvaluationFundForm } from "./formPages/EvaluationFundForm";
import { ResourceSupportForm } from "./formPages/ResourceSupportForm";

import "./construct-page.css";
const uuid = () => Math.random().toString(36).slice(-6);

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

type TReqLogistics = {
  lecture: string;
  seminars: string;
  disabled: string;
};
type TDiscContent = {
  id: number;
  discSection: string;
  lectureHours?: string;
  semHours?: string;
  labHours?: string;
  contactHours?: string;
  selfHours?: string;
};

type TFormData = {
  rpdId: string;
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
  hours: string;
  creditUnits: string;
  discSections: TDiscContent[];
  supportList: string;
  fundList: string;
  literatureList: string;
  periodicalsList: string;
  internetResList: string;
  infoTechResList: string | null;
  profDataInfList: string;
  reqSoftwareList: string;
  TReqLogistics: TReqLogistics;
};

const ConstructPage: React.FC = () => {
  const location = useLocation();
  const formValues = location.state?.formValues || {};

  const INITIAL_DATA: TFormData = {
    // Инициализация полей формы
    rpdId: uuid(),
    rpdName: formValues.rpdName,
    direction: formValues.direction,
    code: formValues.code,
    educLvl: formValues.educLvl,
    educForm: formValues.educForm,
    year: new Date().getFullYear().toString(),
    protocol: formValues.protocol || "",
    date: formValues.date || "",
    surname: formValues.surname || "",
    name: formValues.name || "",
    fName: formValues.fName || "",
    goals: formValues.goals || "",
    tasks: formValues.tasks || "",
    objectives: formValues.objectives || "",
    disciplinePlace: formValues.disciplinePlace || "",
    semester: formValues.semester || 1,
    course: formValues.course || "",
    competencies: formValues.competencies?.length
      ? formValues.competencies
      : [],
    hours: formValues.hours || "",
    creditUnits: formValues.creditUnits || "",
    discSections: [],
    supportList: formValues.supportList || "",
    fundList: formValues.fundList || "",
    literatureList: formValues.literatureList || "",
    periodicalsList: formValues.periodicalsList || "",
    internetResList: formValues.internetResList || "",
    infoTechResList: formValues.infoTechResList || "",
    profDataInfList: formValues.profDataInfList || "",
    reqSoftwareList: formValues.reqSoftwareList || "",
    TReqLogistics: {
      lecture: formValues.TReqLogistics?.lecture || "",
      seminars: formValues.TReqLogistics?.seminars || "",
      disabled: formValues.TReqLogistics?.disabled || "",
    },
  };

  const [hours, setHours] = useState("");
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
    {
      component: DiscSizeForm,
      title: "Объем дисциплины",
    },
    {
      component: DiscContentForm,
      title: "Разделы дисциплины",
      hours: data.hours,
    },
    {
      component: EducMethSupportForm,
      title: "Перечень учебно-методического обеспечения",
    },
    // {
    //   component: EvaluationFundForm,
    //   title: "Фонды оценочных средств",
    // },
    {
      component: ResourceSupportForm,
      title: "Ресурсное обеспечение",
    },
  ];

  function updateFields(fields: Partial<TFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
    if (fields.hours) {
      setHours(fields.hours);
    }
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
      <step.component {...data} updateFields={updateFields} /> // .component - элементы формы, (...data) - нужные данные
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
