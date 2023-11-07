import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, price, amount, total) {
  return { name, price, amount, total };
}

export default function SummaryOrder() {
  const location = useLocation();
  const { groupedMenu, menu } = location.state || {};
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    let arr = [...menu];
    for (let i = 0; i < arr.length; i++) {
      const price = arr[i].Price == 0 ? "" : arr[i].Price;
      arr[i] = createData(arr[i].Name, price, 1, price);
    }
    setRows(arr);
  }, []);
  console.log(groupedMenu);
  return (<div style={{margin:"24px auto", width:"70vw"}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell align="right">מוצר</StyledTableCell>
            <StyledTableCell align="right">מחיר</StyledTableCell>
            <StyledTableCell align="right">כמות</StyledTableCell>
            <StyledTableCell align="right">סה"כ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length>0 && rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right"> <ClearIcon color="error"/> </StyledTableCell>
              <StyledTableCell align="right">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
