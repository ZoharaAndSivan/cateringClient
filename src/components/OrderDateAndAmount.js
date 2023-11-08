import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
const OrderDateAndAmount = () => {
  const { id, min } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(null);

  function TDate() {
    const ToDate = new Date();
    return new Date(date).getTime() > ToDate.getTime();
}

  const submit = () => {
    console.log(TDate())
    console.log(date, amount,new Date(date).toLocaleDateString(),(new Date(date).toLocaleDateString() > new Date().toLocaleDateString() && amount > 0))
    if (!(TDate() && amount >= min)) {
      Swal.fire({
        title: "אופס...",
        text: "יש להזין תאריך וכמות תקינים",
        icon: "warning",
      });
    } else {
      navigate(`/menu/${id}/${date}/${amount}`);
    }
  };
  return (
    <div className="p-5">
      <div className="shadow text-center" style={{ width:"40vw", margin: "0 auto", padding: "64px 12px", borderRadius:"25px" }}>
        <h3>
          תאריך <CalendarMonthIcon />
        </h3>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
       <br/> <br/>

        <h3>
          אורחים <PeopleIcon />
        </h3>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
        <p>* מינימום משתתפים {min}</p>
        <br/> <br/>
        <Button onClick={submit} variant="contained"> המשך </Button>
      </div>
    </div>
  );
};
export default OrderDateAndAmount;
