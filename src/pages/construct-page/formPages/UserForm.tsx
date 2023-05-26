import React from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { FormWrapper } from "./FormWrapper";

type UserData = {
  code: string;
  spec: string;
  recYear: string;
  disc: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserForm({
  code,
  spec,
  recYear,
  disc,
  updateFields,
}: UserFormProps) {
  return (
    <>
      <FormWrapper title="Титульный лист">
        <Typography variant="body2">Код и направление подготовки</Typography>
        <TextField
          required
          id="outlined-required"
          label="Выбранные  код и направление подготовки"
          value={code}
          onChange={(e) => updateFields({ code: e.target.value })}
        />
        <Typography variant="body2">Специализация</Typography>
        <TextField
          required
          id="outlined-required"
          label="Выбранная специализация"
          value={spec}
          onChange={(e) => updateFields({ spec: e.target.value })}
        />
        <Typography variant="body2">Год набора</Typography>
        <TextField
          required
          id="outlined-required"
          label="Выбранный год набора"
          value={recYear}
          onChange={(e) => updateFields({ recYear: e.target.value })}
        />
        <Typography variant="body2">Дисциплина</Typography>
        <TextField
          required
          id="outlined-required"
          label="Выбранная дисциплина"
          value={disc}
          onChange={(e) => updateFields({ disc: e.target.value })}
        />
      </FormWrapper>
    </>
  );
}
