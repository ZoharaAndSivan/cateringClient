import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../AlertMessage";
import Alerts from "../Alerts";
import Poppers from "../Popper";

const FoodSingle = ({ row, isItemSelected, labelId, handleClick, count }) => {
  const [checked, setChecked] = React.useState(row.isPay);
  const [flag, setFlag] = React.useState(false);
  const dispatch = useDispatch();

  const changeExpense = async () => {
    try {
      setFlag(true);
      // const url = API_URL + "/expenses/changePay/" + row.Id;
      // const { data } = await doApiMethodToken(url, "PATCH");
      // console.log(data);
      // const price = checked ? (row.price * -1) : row.price;
      // console.log(price);
      // dispatch(updateBalance({ balance: price }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.Id}
      selected={isItemSelected}
    >
      <TableCell
        padding="checkbox"
        sx={{ cursor: "pointer" }}
        onClick={(event) => handleClick(event, row.Id)}
      >
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.Image}
      </TableCell>
      <TableCell align="right">{row.Name}</TableCell>
      <TableCell align="right">{row.Price}</TableCell>
      <TableCell>
        {!flag ? (
          <Poppers
            type={2}
            func={changeExpense}
            text="שנות את התשלום"
            checked={checked}
            content={checked ? "שולם" : "לא שולם"}
            setChecked={setChecked}
          />
        ) : row.Id != 10 ? (
          <AlertMessage
            setFlag={setFlag}
            variant={"success"}
            children={<Alerts message={"התשלום שונה בהצלחה!"} />}
          />
        ) : null}
      </TableCell>

      <TableCell align="right">{row.Active ? "פעיל" : "לא פעיל"}</TableCell>
    </TableRow>
  );
};

export default FoodSingle;
