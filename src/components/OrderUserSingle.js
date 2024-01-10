import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import AlertMessage from "./AlertMessage";
import Alerts from "./Alerts";
import { useNavigate } from "react-router";
import { getFoodsOrder } from "../service/order";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveEditOrder } from "../store/action/order";

export default function OrderUserSingle({ item, cancelOrder }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let menus=[];
  const [days, setDays] = useState(0);
  const [flag, setFlag] = useState(false);
  const [menu, setMenu] = useState([]);
  const [event, setEvent] = useState();
  const [menuEvent, setMenuEvent] = useState([]);
  const contentRef = React.useRef(null);
  const {  menuTypes, menusEvents } = useSelector((state) => {
    return {
      menuTypes: state.catering.menuTypes,
      menusEvents: state.catering.menusEvents
    };
  }, shallowEqual);

  useEffect(() => {
    console.log(menusEvents)
    setEvent(menusEvents.find((x) => x.Id == item.Event.Id)); //מחזיר אובייקט
    let arr = menuTypes.filter((x) => x.MenuId == item.MenuId);
    arr = arr.map((obj) => ({ ...obj }));
    setMenuEvent(arr);
  }, []);

  useEffect(() => {
    if(new Date(item.EventDate) > new Date()){
    const date1 = new Date();
    const date2 = new Date(item.EventDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
    console.log(item.EventDate, diffDays)
  }
  }, []);

  useEffect(() => {
    getFoodsOrder(item.Id)
      .then((response) => {
        menus = response.data.map((x) => x.Food);
        setMenu(response.data.map((x) => x.Food));
        console.log(response.data.map((x) => x.Food));
      })
      .catch((err) => console.log(err));
  }, []);



  const orderDetails = () => {
    console.log(menu);
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

    const time = item.EventTime;
    const date = item.OrderDate;
    const amount = item.NumberPeople;
    const type = "watch";
    navigate("/summaryOrder", { state: { groupedMenu, menu, date, amount, event, time, menuEvent, type } });
  };

  const update = () => {
    //עריכת הזמנה
    dispatch(saveEditOrder({...item, Products:menu}));
    navigate(`/menuType/${item.Event.Id}`);
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        alt={item.Event.Name}
        height="140"
        image={`../../images/${item.Event.Image}.jpg`}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h5> אירוע: {item.Event.Name} </h5>
          <h5> סוג תפריט: {item.Menu.Name} </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p> תאריך הזמנה: {new Date(item.OrderDate).toLocaleDateString()} </p>
          <p> תאריך האירוע: {new Date(item.EventDate).toLocaleDateString()} </p>
          <p> זמן: {item.EventTime.slice(0, 5)} </p>
          <p> סה"כ מחיר: {item.FullPrice.toLocaleString()} </p>
          <p> אורחים: {item.NumberPeople} </p>
          <p>
            {item.IsClose.data[0] ? (
              <span> ההזמנה אושרה </span>
            ) : (
              <span> ההזמנה לא אושרה </span>
            )}
          </p>
          <Button variant="contained" onClick={orderDetails}>
            לצפייה בפרטי ההזמנה
          </Button>
        </Typography>
      </CardContent>

      {days > 2 && !flag ? (
        <CardActions>
          <Button size="small" onClick={()=>{cancelOrder(item)}}>
            בטל
          </Button>
          <Button size="small" onClick={update}>
            עדכן
          </Button>
        </CardActions>
      ) : flag ? (
        <AlertMessage
          variant={"success"}
          setFlag={setFlag}
          children={<Alerts message={"בוטל בהצלחה"} />}
        />
      ) : null}
    </Card>
  );
}
