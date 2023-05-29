import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { mockRowData } from "../pages/directions-page/mockData";

type DialogMenuProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
};

const DialogMenu: React.FC<DialogMenuProps> = ({ open, onClose, onSubmit }) => {
  const [textFieldValues, setTextFieldValues] = useState<
    Record<string, string>
  >({
    name: "",
    direction: "",
    dirCode: "",
    educationLevel: "",
    educationForm: "",
  });

  const handleTextFieldChange = (name: string, value: string) => {
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectorChange = (event: SelectChangeEvent) => {
    const { value, name } = event.target;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDialogSubmit = () => {
    onSubmit(textFieldValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать новую рабочую программу</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ paddingTop: "16px" }}>
          Название рабочей программы
        </Typography>
        <TextField
          value={textFieldValues.name}
          onChange={(event) =>
            handleTextFieldChange("name", event.target.value)
          }
          fullWidth
        />
        <Typography variant="body2" sx={{ paddingTop: "16px" }}>
          Направление
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="direction-label">Направление</InputLabel>
          <Select
            fullWidth
            labelId="direction-label"
            id="direction"
            value={textFieldValues.direction}
            onChange={(event) => handleSelectorChange(event)}
            name="direction"
            label="Направление"
          >
            {mockRowData.map((row) => (
              <MenuItem key={row.id} value={row.programm}>
                {row.programm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ paddingTop: "16px" }}>
          Код направления
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="dirCode-label">Код направления</InputLabel>
          <Select
            fullWidth
            labelId="dirCode-label"
            id="dirCode"
            value={textFieldValues.dirCode}
            onChange={(event) => handleSelectorChange(event)}
            name="dirCode"
            label="Направление"
          >
            {mockRowData
              .filter((row) => row.programm === textFieldValues.direction)
              .map((row) => (
                <MenuItem key={row.id} value={row.code}>
                  {row.code}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ paddingTop: "16px" }}>
          Уровень образования
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="education-level-label">
            Уровень образования
          </InputLabel>
          <Select
            fullWidth
            labelId="education-level-label"
            id="education-level"
            value={textFieldValues.educationLevel}
            onChange={(event) => handleSelectorChange(event)}
            name="educationLevel"
            label="Уровень образования"
          >
            <MenuItem value="Магистратура">Магистратура</MenuItem>
            <MenuItem value="Бакалавриат">Бакалавриат</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ paddingTop: "16px" }}>
          Форма обучения
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="education-form-label">Форма обучения</InputLabel>
          <Select
            fullWidth
            labelId="education-form-label"
            id="education-form"
            value={textFieldValues.educationForm}
            onChange={(event) => handleSelectorChange(event)}
            name="educationForm"
            label="Форма обучения"
          >
            <MenuItem value="Очная">Очная</MenuItem>
            <MenuItem value="Заочная">Заочная</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleDialogSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMenu;