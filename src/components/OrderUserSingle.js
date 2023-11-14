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

export default function OrderUserSingle({ item, cancelOrder }) {
  const [days, setDays] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const date1 = new Date();
    const date2 = new Date(item.EventDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  const cancel = () => {
    console.log(cancelOrder(item))
    if (cancelOrder(item)) {
      setFlag(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
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
        </Typography>
      </CardContent>

      {days > 2 && !flag ? (
        <CardActions>
          <Button size="small" onClick={cancel}>
            בטל
          </Button>
          <Button size="small"> עדכן </Button>
        </CardActions>
      ) : flag ? (
        <AlertMessage
          variant={"success"}
          setFlag={setFlag}
          children={
            <Alerts message={"בוטל בהצלחה"} />
          }
        />
      ) : null}
    </Card>
  );
}
