import {
  Button,
  Checkbox,
  FormControlLabel,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AlertMessage from "./AlertMessage";
import Alerts from "./Alerts";
import Poppers from "./Poppers";
import { changeIsClose, getFoodsOrder } from "../service/order";
import { useNavigate } from "react-router-dom";

const OrderManagerSingle = ({ row, isItemSelected }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(row.IsClose.data[0]);
  const [flag, setFlag] = useState(false);
  const [menu, setMenu] = useState([]);
  const [event, setEvent] = useState();
  const [menuEvent, setMenuEvent] = useState([]);
  const { menuTypes, menusEvents } = useSelector((state) => {
    return {
      menuTypes: state.catering.menuTypes,
      menusEvents: state.catering.menusEvents,
    };
  }, shallowEqual);

  useEffect(() => {
    console.log(menusEvents);
    setEvent(menusEvents.find((x) => x.Id == row.EventId)); //מחזיר אובייקט
    let arr = menuTypes.filter((x) => x.MenuId == row.MenuId);
    arr = arr.map((obj) => ({ ...obj }));
    setMenuEvent(arr);
  }, []);

  useEffect(() => {
    getFoodsOrder(row.Id)
      .then((response) => {
        setMenu(response.data.map((x) => x.Food));
      })
      .catch((err) => console.log(err));
  }, []);

  const changeClose = () => {
    setFlag(true);
    changeIsClose(row.Id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const orderDetails = () => {
    const groupedMenu = Object.entries(
      menu.reduce((acc, { Id, FoodTypeId, Active, Name, Price }) => {
        if (!acc[FoodTypeId]) {
          acc[FoodTypeId] = [];
        }
        acc[FoodTypeId].push({ Id, Active, Name, Price, FoodTypeId });
        return acc;
      }, {})
    ).map(([type, options]) => ({ type, options }));
    menu.sort((a, b) => a.FoodTypeId - b.FoodTypeId);

    const time = row.EventTime;
    const date = row.OrderDate;
    const amount = row.NumberPeople;
    const type = "watch";
    navigate("/summaryOrder", {
      state: { groupedMenu, menu, date, amount, event, time, menuEvent, type },
    });
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
      <TableCell align="right">{row.UserName}</TableCell>
      <TableCell align="right">{row.Phone}</TableCell>
      <TableCell align="right">{row.EventName}</TableCell>
      <TableCell align="right">{row.MenuName}</TableCell>
      <TableCell align="right">
        {new Date(row.OrderDate).toLocaleDateString()}
      </TableCell>
      <TableCell align="right">
        {new Date(row.EventDate).toLocaleDateString()}
      </TableCell>
      <TableCell align="right">{row.EventTime.slice(0, 5)}</TableCell>
      <TableCell align="right">{row.EventPlace}</TableCell>
      <TableCell align="right">{row.NumberPeople.toLocaleString()}</TableCell>
      <TableCell align="right">{row.Note}</TableCell>
      <TableCell align="right">{row.FullPrice.toLocaleString()}</TableCell>
      <TableCell>
        {checked ? (
          <>הזמנה אושרה</>
        ) : !flag ? (
          <Poppers
            type={2}
            func={changeClose}
            text="שנות את הסטטוס"
            checked={checked}
            content={checked ? "אושר" : "לא אושר"}
            setChecked={setChecked}
          />
        ) : (
          <AlertMessage
            setFlag={setFlag}
            variant={"success"}
            children={<Alerts message={"ההזמנה שונתה בהצלחה!"} />}
          />
        )}
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={orderDetails} size="small">
          {" "}
          צפייה בתפריט{" "}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderManagerSingle;
