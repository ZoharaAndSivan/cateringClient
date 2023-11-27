//קומפוננטת הרשמה
//ייבוא סיפריה שמטפלת בטפסים
import { useState } from "react";
import "./Register.scss";
import * as yup from "yup";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Register(){


  const schema = yup
  .object({ 
      Email: yup.string().email().required("שדה זה חובה"),
      Password: yup.string().required("שדה זה חובה")
  })
  .required();

const arr = [
  { lableName: "שם מלא ", name: "FullName", type: "text" },
  { lableName: "סיסמא", name: "Password", type: "string" },
];

const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  //pattern,
} = useForm({
  resolver: yupResolver(schema),
});


const onSubmit = (data) => {
  //נשלח לשרת
  console.log(data);
};

  return(
    <>
    {/* <div id="divOtef" >vghftdvrdchghfvgfvd</div> */}
     <form onSubmit={handleSubmit(onSubmit)}>
       
       <h4 id="h4">בוא נתכנן את האירוע המושלם שלכם!!!</h4>


        <TextField
          id="outlined-basic"
          //id="outlined"
          label={"כתובת מייל"}
          name={"Email"}
          type={"text"}
          {...register("Email")}
          variant="outlined"
          disabled={false}
          //color="yellow"
          //border-c
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center",width:"95%" }}
        />
  <MailOutlineIcon/>
        <br/>
        <TextField
          id="outlined-basic"
          //id="outlined"
          label={"סיסמא"}
          name={"Password"}
          type={"string"}
          {...register("Password")}
          variant="outlined"
          disabled={false}
          //color="yellow"
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center" }}
        />
        <br/>

       <Button variant="contained" type="submit">
        התחבר
        </Button>
     </form>
     
    
    </>
  )
}
