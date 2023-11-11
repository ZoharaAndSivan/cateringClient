import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";

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

function createData(id, name, price, amount, total) {
  return { id, name, price, amount, total };
}

export default function SummaryOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupedMenu, menu, amount, date, event, time } = location.state || {};
  const [rows, setRows] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [menuProducts, setMenuProducts] = React.useState([...menu]);

  React.useEffect(() => {
    let globalSum = 0;
    const obj = createData(
      event.Id,
      event.Name,
      event.Price,
      amount,
      parseInt(event.Price * amount)
    );

    globalSum += event.Price * amount;
    let arr = [obj, ...menu];
    for (let i = 1; i < arr.length; i++) {
      const price = arr[i].Price == 0 ? "" : arr[i].Price;
      const amount2 = arr[i].Price == 0 ? 1 : amount;
      const sum = arr[i].Price == 0 ? "" : price * amount2;
      arr[i] = createData(arr[i].Id, arr[i].Name, price, amount2, sum);
      globalSum += sum == "" ? 0 : sum;
    }
    setPrice(globalSum);
    setRows(arr);

    for (let i = 0; i < groupedMenu.length; i++) {
      const element = groupedMenu[i];
      // if(element.options.length > )
      
    }
  }, []);

  const delProduct = (item) => {
    const arr = rows.filter((x) => x.id != item.id);
    console.log(groupedMenu[0]);
    const arrMenu = menuProducts.filter((x) => x.Id != item.id);
    setRows(arr);
    setMenuProducts(arrMenu);
    if (item.price != "") {
      setPrice(price - item.total);
    }
    console.log("pppppp", arrMenu);
  };

  console.log(groupedMenu);
  return (
    <div style={{ margin: "24px auto", width: "70vw" }}>
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
            {rows.length > 0 &&
              rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    align="right"
                    onClick={() => delProduct(row)}
                  >
                    {index != 0 && <ClearIcon color="error" />}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price} {row.price != "" && <span>₪</span>}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total} {row.price != "" && <span>₪</span>}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            <StyledTableRow>
              <StyledTableCell align="right">סה"כ</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{price.toLocaleString()} ₪</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br/> <br/><br/>
      <h3> סה"כ בסל הקניות : {price.toLocaleString()} ₪</h3>
      <Button variant="contained" onClick={()=> navigate("/orderDetails", { state: { groupedMenu, menu, date, amount, event, time, price } })}> מעבר לתשלום </Button>
    </div>
  );
}
