import { ReactNode } from "react";
import Typography from "@mui/material/Typography";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}
      >
        {title}
      </Typography>
      <div
      // style={{
      //   display: "grid",
      //   gap: "1rem .5rem",
      //   justifyContent: "flex-start",
      //   gridTemplateColumns: "auto minmax(auto, 400px)",
      // }}
      >
        {children}
      </div>
    </>
  );
}
