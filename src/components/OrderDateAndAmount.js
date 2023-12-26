import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import AccessTime from "@mui/icons-material/AccessTime";
import { Button, TextField } from "@mui/material";

import Swal from "sweetalert2";

const OrderDateAndAmount = () => {
  const { id, min } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);

  const editOrder = useSelector((state) => state.order.editOrder);

  useEffect(() => {
    console.log(editOrder);
    if (editOrder) {
      setDate(editOrder.EventDate);
      setTime(editOrder.EventTime);
      setAmount(editOrder.NumberPeople);
    }
  }, [editOrder]);

  function TDate() {
    const ToDate = new Date();
    return new Date(date).getTime() > ToDate.getTime();
  }

  const submit = () => {
    console.log(TDate());
    console.log(amount >= min, amount, min);
    console.log(
      date,
      amount,
      new Date(date).toLocaleDateString(),
      new Date(date).toLocaleDateString() > new Date().toLocaleDateString() &&
        amount > 0
    );
    if (!(TDate() && parseInt(amount) >= parseInt(min) && time)) {
      Swal.fire({
        title: "אופס...",
        text: "יש להזין מועד וכמות תקינים",
        icon: "warning",
      });
    } else {
      navigate(`/menu/${id}/${date}/${amount}/${time}`);
    }
  };
  return (
    <>
      <div className="p-5">
        <div
          className="shadow text-center"
          style={{
            width: "40vw",
            margin: "0 auto",
            padding: "20px 12px",
            borderRadius: "25px",
          }}
        >
          <h5>
            תאריך <CalendarMonthIcon />
          </h5>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            defaultValue={
              editOrder
                ? new Date(editOrder.EventDate).toISOString().split("T")[0]
                : null
            }
            style={{ width: "15vw" }}
            onChange={(e) => setDate(e.target.value)}
          />
          <br /> <br />
          <h5>
            זמן <AccessTime />
          </h5>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="time"
            defaultValue={editOrder && editOrder.EventTime}
            style={{ width: "15vw" }}
            onChange={(e) => setTime(e.target.value)}
          />
          <br /> <br />
          <h5>
            אורחים <PeopleIcon />
          </h5>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            defaultValue={editOrder ? editOrder.NumberPeople : null}
            style={{ width: "15vw" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p>* מינימום משתתפים {min}</p>
          <br /> <br />
          <Button
            onClick={submit}
            variant="contained"
            style={{ backgroundColor: "rgb(142, 110, 51)" }}
          >
            {" "}
            המשך{" "}
          </Button>
        </div>
      </div>
    </>
  );
};
export default OrderDateAndAmount;
