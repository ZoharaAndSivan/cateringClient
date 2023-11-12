import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import AccessTime from "@mui/icons-material/AccessTime";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
const OrderDateAndAmount = () => {
  const { id, min } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);

  function TDate() {
    const ToDate = new Date();
    return new Date(date).getTime() > ToDate.getTime();
}

  const submit = () => {
    console.log(TDate())
    console.log(date, amount,new Date(date).toLocaleDateString(),(new Date(date).toLocaleDateString() > new Date().toLocaleDateString() && amount > 0))
    if (!(TDate() && amount >= min && time)) {
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
    <div className="p-5">
      <div className="shadow text-center" style={{ width:"40vw", margin: "0 auto", padding: "64px 12px", borderRadius:"25px" }}>
        <h5>
          תאריך <CalendarMonthIcon />
        </h5>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="date"
          style={{width:"15vw"}}
          onChange={(e) => setDate(e.target.value)}
        />
       <br/> <br/>
        <h5>
          זמן <AccessTime />
        </h5>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="time"
          style={{width:"15vw"}}
          onChange={(e) => setTime(e.target.value)}
        />
       <br/> <br/>

        <h5>
          אורחים <PeopleIcon />
        </h5>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          style={{width:"15vw"}}
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
