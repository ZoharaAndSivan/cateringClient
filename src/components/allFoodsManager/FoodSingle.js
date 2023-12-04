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
