import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, IconButton, TableSortLabel } from "@mui/material";
import { mockWorkRowData } from "./mockWorkData";
// import educData from "./educData.json"
import DialogMenu from "../../components/DialogMenu";

import "./workingProgramms-page.css";

type rowData = {
  id: number;
  code: string;
  rpdName: string;
  educLvl: string;
  authors: string;
};

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = <T,>(
  rowArray: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedRowArray = rowArray.map(
    (el: any, index: any) => [el, index] as [T, number]
  );
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((el) => el[0]);
};

const WorkingProgramms: React.FC = () => {
  const [orderDirection, setOrderDirection] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("programm");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof rowData
  ) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderBy(property);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = (values: Record<string, string>) => {
    // Handle the form submission here
    console.log("Form submitted:", values);
  };

  return (
    <div className="workingProgramms-page">
      <div className="padClass">
        <Typography className="planText" variant="h5">
          Рабочие программы дисциплин
        </Typography>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead style={{ backgroundColor: "#1D51A3" }}>
                  <TableRow>
                    <TableCell key="code">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "code"}
                        direction={orderBy === "code" ? orderDirection : "asc"}
                        onClick={(event) => handleRequestSort(event, "code")}
                      >
                        Код
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="rpdName">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "rpdName"}
                        direction={
                          orderBy === "rpdName" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "rpdName")}
                      >
                        Название
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="educLvl">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "educLvl"}
                        direction={
                          orderBy === "educLvl" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "educLvl")}
                      >
                        Уровень образования
                      </TableSortLabel>
                    </TableCell>
                    <TableCell key="authors">
                      <TableSortLabel
                        style={{ color: "white" }}
                        active={orderBy === "authors"}
                        direction={
                          orderBy === "authors" ? orderDirection : "asc"
                        }
                        onClick={(event) => handleRequestSort(event, "authors")}
                      >
                        Авторы
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {sortedRowInformation(
                  mockWorkRowData,
                  getComparator(orderDirection, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.rpdName}</TableCell>
                      <TableCell>{row.educLvl}</TableCell>
                      <TableCell>{row.authors}</TableCell>
                      {/* <TableCell>{row.educDir}</TableCell> */}
                    </TableRow>
                  ))}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockWorkRowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <div style={{ position: "sticky", bottom: "20px", zIndex: 1 }}>
            <IconButton
              size="large"
              sx={{ fontSize: "2rem", padding: "16px" }}
              style={{
                position: "relative",
                float: "right",
                marginRight: "20px",
              }}
              onClick={handleOpenDialog}
            >
              <AddCircleIcon
                sx={{ fontSize: "2.5rem" }}
                fontSize="large"
                color="primary"
              />
            </IconButton>
          </div>
          <DialogMenu
            open={isDialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleDialogSubmit}
          />
        </Box>
      </div>
    </div>
  );
};

export default WorkingProgramms;
