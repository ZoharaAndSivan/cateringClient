import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./ScssComponets/ContactUs.scss";
import { useNavigate} from "react-router-dom";
import { AddContact } from "../service/User";


import { Button, TextField } from "@mui/material";
import { useState } from "react";
//import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";



import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


export default function ContactUs() {
  const navigate = useNavigate();

  
  const schema = yup
    .object({
      FullName: yup.string().required("שדה זה חובה"),
      //.pattern( /^[a-zA-Zא-ת]/,"שם מכיל אותיות בלבד")
      Phone: yup
        .string()
        .required("שדה זה חובה")
        .min(9, "מספר הפלאפון אינו תקין")
        .max(10, "מספר הפלאפון אינו תקין"),
      Email: yup.string().email().required("שדה זה חובה"),
      Note: yup.string(),
    })
    .required();

  const arr = [
    { lableName: "שם מלא ", name: "FullName", type: "text" },
    { lableName: "טלפון", name: "Phone", type: "string" },
    { lableName: "כתובת מייל", name: "Email", type: "text" },
    { lableName: "הערות", name: "Note", type: "text" },
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
    console.log(data);
    //הוספת צור קשר
    AddContact(data)
      .then((response) => {
        Swal.fire({
          title: "נשלח בהצלחה!", 
          text: "ניצור איתך קשר בהקדם ",
          icon: "success",
          confirmButtonText: "סיים",
        }).then((result) => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
    
  };

  return (
    <>
    {/* <br/> */}
 <h4 className="h4-ContactUs">בואו נתכנן את האירוע שלכם!!!</h4>
    <div className="contactImage"></div>
    <div className="div-contactUs">

      <div className="bigDivContactUs">
        <div className="divForm">
          <form className="formContact" onSubmit={handleSubmit(onSubmit)}>
            <div className="divNamePhone">
              <TextField
                className="divNameandPhone"
                color="action"
                id="outlined-basic"
                //id="outlined"
                label={"שם מלא "}
                name={"FullName"}
                type={"string"}
                {...register("FullName")}
                variant="outlined"
                disabled={false}
                //color="yellow"
                style={{
                  backgroundColor: "#ebedf0",
                  margin: 20,
                  textAlign: "center",
                  width: "300px"
                }}
              />
              

              <TextField
                className="divNameandPhone"
                color="action"
                id="outlined-basic"
                //id="outlined"
                label={"טלפון"}
                name={"Phone"}
                type={"text"}
                {...register("Phone")}
                variant="outlined"
                disabled={false}
                //color="yellow"
                style={{
                  backgroundColor: "#ebedf0",
                  margin: 20,
                  textAlign: "center",
                  width: "300px"
                }}
              />
              <br />
            </div>

            <TextField
              color="action"
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
              style={{
                backgroundColor: "#ebedf0",
                margin: 20,
                textAlign: "center",
                width: "500px",
              }}
            />

            <br />
            <TextField
              color="action"
              id="outlined-basic"
              //id="outlined"
              label={"הערות"}
              name={"Note"}
              type={"text"}
              {...register("Note")} 
              variant="outlined"
              disabled={false}
              //color="yellow"
              style={{
                backgroundColor: "#ebedf0",
                margin: 20,
                textAlign: "center",
              }}
            />
            <br />

            <Button variant="contained" type="submit" style={{backgroundColor:"brown"}}>
              שלח
            </Button> 
          </form>
        </div>
      </div>

      {/* <div className="contact-image"></div> */}
      <br />
      {/* <div       style={{border:"1px solid",backgroundColor:"black",height:"500px"}}
></div> */}

<div className="detailsContact">

<div className="iconContact"><PhoneInTalkIcon/>0524378458</div>
<div className="iconContact"><MailOutlineIcon/> delishes147@gmail.com</div>
</div>
</div>
    </>
  );
}


