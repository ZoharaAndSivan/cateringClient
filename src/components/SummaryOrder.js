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
import "./ScssComponets/SummaryOrder.scss"; 
import { Padding } from "@mui/icons-material";

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


function createData(id, category, name, price, amount, total) {
  return { id, category, name, price, amount, total };
}

export default function SummaryOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupedMenu, menu, amount, date, event, time, menuEvent, type } =
    location.state || {};
  const [grouped, setGroued] = React.useState([...groupedMenu]);
  const [rows, setRows] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [menuProducts, setMenuProducts] = React.useState([...menu]);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    orderRows(groupedMenu);
  }, []);

  const orderRows = (arrToOrder) => {
    let globalSum = 0;
    // סוג אירוע
    const obj = createData(
      event.Id,
      "",
      event.Name,
      event.Price,
      amount,
      parseInt(event.Price * amount)
    );

    //מחיר סופי
    globalSum += event.Price * amount;

    let arr = [obj];
    console.log(arrToOrder);
    console.log(menuEvent);

    for (let i = 0; i < arrToOrder.length; i++) {
      //אובייקט
      const element = arrToOrder[i];

      // const productInMenu = menuEvent.find(
      //   (x) => x.FoodTypeId.Id.toLocaleString() == element.type.toLocaleString()
      // );
      //let priceToAdd = productInMenu.ExtraType;
      const arrProducts = element.options;
      const x = menuEvent.find(
        (x) => x.FoodTypeId.Id.toLocaleString() == element.type.toLocaleString()
      );

      for (let i = 0; i < arrProducts.length; i++) {
        let price =
          arrProducts[i].Price == 0 && x.ExtraPrice == 0
            ? ""
            : parseInt(x.ExtraPrice)+parseInt(arrProducts[i].Price) ;
     
        const amount2 = arrProducts[i].Price == 0 &&  x.ExtraPrice == 0? 1 : amount;

        const sum = price == 0 ? "" : price * amount2;
        arr.push(
          createData(
            arrProducts[i].Id,
            x.FoodTypeId.Name,
            arrProducts[i].Name,
            price,
            amount2,
            sum
          )
        );
        globalSum += sum == "" ? 0 : sum;
      }
    }

    setPrice(globalSum);
    setRows(arr);
  };

  const delProduct = (item) => {
    const arr = rows.filter((x) => x.id != item.id);
    const arrMenu = menuProducts.filter((x) => x.Id != item.id);
    const x = [];
    for (let i = 0; i < grouped.length; i++) {
      const element = grouped[i].options;
      x[i] = { type: grouped[i].type, options: [] };
      for (let j = 0; j < element.length; j++) {
        if (element[j].Id != item.id) {
          x[i].options.push(element[j]);
        }
      }
    }
    setGroued(x);
    setRows(arr);
    setMenuProducts(arrMenu);
    if (item.price != "") {
      setPrice(price - item.total);
    }
    orderRows(x);
  };

  //הדפסת תפריט
  const handlePrint = () => {
    const content = contentRef.current;
    if (content) {
      const printWindow = window.open('', '_target');
      printWindow.document.write('<html><head><title>הדפסת תפריט</title>');
      printWindow.document.write(
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">'
      ); // Replace with your stylesheet link
      printWindow.document.write('</head><body>');
      printWindow.document.write(content.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };
  return (
<>
    <h2 className="h2SummryOrder">סיכום הזמנה</h2>
    <br/>
    <div style={{ margin: "24px auto", width: "70vw" }}  ref={contentRef}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> </StyledTableCell>
              <StyledTableCell align="right">סוג מוצר</StyledTableCell>
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
                    {index != 0 && !type && <ClearIcon color="error" />}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.category}</StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.price.toLocaleString()}{" "}
                    {row.price != "" && <span>₪</span>}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total.toLocaleString()}{" "}
                    {row.price != "" && <span>₪</span>}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              
            <StyledTableRow>
              <StyledTableCell align="right">סה"כ</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">
                {price.toLocaleString()} ₪
              </StyledTableCell>
            </StyledTableRow>

          </TableBody>
        </Table>
      </TableContainer> 
      <br />
      <br />
      <br />
     
          <h3> סה"כ   : {price.toLocaleString()} ₪</h3> 

          <div className="2Buttom">
          <Button className="buttomSummry" variant="contained" onClick={handlePrint}>הדפסת הזמנה</Button>
          {!type && (
        <>
          <Button className="buttomSummry"  
            variant="contained"
            onClick={() =>
              navigate("/orderDetails", {
                state: { groupedMenu, menu, date, amount, event, time, price },
              })
            }
          >
            {" "}
            מעבר לתשלום{" "}
          </Button>{" "}
        </>
      )}
       </div>
    </div>
    </>
  );
}
