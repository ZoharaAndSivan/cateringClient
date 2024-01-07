import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./ScssComponets/ContactUs.scss";


import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";



// import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';


export default function ContactUs() {
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

  };

  return (
    <>
    <div className="div-contactUs">

      <h4 className="h4-ContactUs">בואו נתכנן את האירוע המושלם שלכם!!!</h4>

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
      <br />
      {/* <div       style={{border:"1px solid",backgroundColor:"black",height:"500px"}}
></div> */}

<div>
  {/* <PhoneInTalkIcon/>
<MailOutlineIcon/> */}
</div>
</div>
    </>
  );
}

// //ייבוא סיפריה שמטפלת בטפסים
// import { useForm } from "react-hook-form";

// //import "./ContactUs.scss";
// //קומפוננטת צור קשר
// export default function ContactUs() {
//   let {
//     register,
//     handleSubmit,
//     formState: { isValid, errors },
//   } = useForm({ mode: "all" });

//   //פונקצייה שמקבלת את הנתונים שהמשתמש הקליד בתוך תיבת טקסט
//   const onSubmit = (data) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h2>צור קשר</h2>

//         <div>
//           <label>שם מלא</label>
//           <br />
//           <input
//             type="text"
//             {...register("Name", {
//               minLength: 2,
//               required: true,
//               pattern: /^[a-zA-Zא-ת]/,
//             })}
//           />
//           {errors.Name?.type == "minLength" && (
//             <div>*שם מכיל לפחות 2 אותיות</div>
//           )}
//           {errors.Name?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
//           {errors.Name?.type == "pattern" && <div>*שם מכיל אותיות בלבד</div>}
//         </div>

//         <div>
//           <label>טלפון</label>
//           <br />
//           <input
//             type="text"
//             {...register("Fhone", {
//               maxLength: 10,
//               minLength: 10,
//               required: true,
//               pattern: /^[0-9]/,
//             })}
//           />
//           {errors.Fhone?.type == "maxLength" && (
//             <div>*מספר טלפון יכיל רק 10 ספרות</div>
//           )}
//           {errors.Fhone?.type == "minLength" && (
//             <div>*מספר טלפון מכיל 10 ספרות</div>
//           )}
//           {errors.Fhone?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
//           {errors.Fhone?.type == "pattern" && (
//             <div>*מספר טלפון מכיל ספרות בלבד</div>
//           )}
//         </div>

//         <div>
//           <label>אימייל</label>
//           <br />
//           <input
//             type="text"
//             {...register("Email", {
//               required: true,
//               pattern: /^[0-9a-zA-Z]{1,}@$/,
//             })}
//           />
//           {errors.Email?.type == "pattern" && <div>*מייל לא בתבנית הנכונה</div>}
//           {errors.Email?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
//         </div>

//         <div>
//           <label>הודעה</label>
//           <br />
//           <input type="text" {...register("Message")} />
//         </div>

//         <input type="submit" value="שלח" disabled={!isValid} />
//       </form>
//     </>
//   );
// }
