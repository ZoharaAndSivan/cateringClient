import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../AlertMessage";
import Alerts from "../Alerts";
import Poppers from "../Popper";
import Model from "./model";

const FoodSingle = ({
  row,
  isItemSelected,
  labelId,
  handleClick,
  open,
  handleOpen,
  handleClose,
  onSubmit,
}) => {
  const [checked, setChecked] = React.useState(row.Active);
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
      <TableCell align="right" >
        <img src={`../../images/${row.Image}`} alt={row.Name}/>
      </TableCell>
      <TableCell align="right">{row.Name}</TableCell>
      <TableCell align="right">{row.Price}</TableCell>
      <TableCell align="right">
        {!flag ? (
          <Poppers
            type={2}
            func={changeExpense}
            text="שנות את פעילות המאכל"
            checked={checked}
            content={checked ? "פעיל" : "לא פעיל"}
            setChecked={setChecked}
          />
        ) : (
          <AlertMessage
            setFlag={setFlag}
            variant={"success"}
            children={<Alerts message={"התשלום שונה בהצלחה!"} />}
          />
        )}
      </TableCell>
      <TableCell align="right">
        <Model
          food={row}
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
          onSubmit={onSubmit}
          key={row.Id}
        />
      </TableCell>
    </TableRow>
  );
};

export default FoodSingle;
