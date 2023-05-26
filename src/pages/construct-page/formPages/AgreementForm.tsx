import React from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type AgreementData = {
  prog: string;
  protocol: string;
  surname: string;
  name: string;
  fName: string;
};

type AgreementFormProps = AgreementData & {
  updateFields: (fields: Partial<AgreementData>) => void;
};

export function AgreementForm({
  prog,
  protocol,
  surname,
  name,
  fName,
  updateFields,
}: AgreementFormProps) {
  return (
    <FormWrapper title="Лист согласования">
      <Typography variant="subtitle2">
        Программа рассмотрена на заседании кафедры:
      </Typography>
      <TextField
        required
        id="standard-required"
        variant="standard"
        value={prog}
        onChange={(e) => updateFields({ prog: e.target.value })}
      />

      <Typography variant="body2">Введите номер протокола</Typography>
      <TextField
        required
        id="standard-required"
        variant="standard"
        value={protocol}
        onChange={(e) => updateFields({ protocol: e.target.value })}
      />
      <Typography variant="body2">Фамилия эксперта</Typography>
      <TextField
        required
        variant="standard"
        id="outlined-required"
        label="Фамилия"
        value={surname}
        onChange={(e) => updateFields({ surname: e.target.value })}
      />
      <Typography variant="body2">Имя эксперта</Typography>
      <TextField
        required
        id="outlined-required"
        variant="standard"
        label="Имя"
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <Typography variant="body2">Отчество эксперта</Typography>
      <TextField
        required
        id="outlined-required"
        label="Отчество"
        variant="standard"
        value={fName}
        onChange={(e) => updateFields({ fName: e.target.value })}
      />
    </FormWrapper>
  );
}
