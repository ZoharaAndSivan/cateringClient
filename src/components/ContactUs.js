import * as yup from "yup";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
//import "./ContactUs.scss"




export default function ContactUs(){


  const schema = yup
  .object({
    FullName: yup.string().required("שדה זה חובה")
    //.pattern( /^[a-zA-Zא-ת]/,"שם מכיל אותיות בלבד")
    ,
    Phone: yup
      .string()
      .required("שדה זה חובה")
      .min(9, "מספר הפלאפון אינו תקין")
      .max(10, "מספר הפלאפון אינו תקין"),
      Email: yup.string().required("שדה זה חובה"),
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
};

  return(
    <>
    {/* <div id="divOtef" >vghftdvrdchghfvgfvd</div> */}
     <form onSubmit={handleSubmit(onSubmit)}>
       
       <h4 id="h4">בוא נתכנן את האירוע המושלם שלכם!!!</h4>

<div id="divNamePhone">
       <TextField
          id="outlined-basic"
          //id="outlined"
          label={"שם מלא "}
          name={"FullName"}
          type={"string"}
          {...register("FullName")}
          variant="outlined"
          disabled={false}
          //color="yellow"
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center" }}
        />
        <br/>


       <TextField
          id="outlined-basic"
          //id="outlined"
          label={"טלפון"}
          name={"Phone"}
          type={"text"}
          {...register("Phone")}
          variant="outlined"
          disabled={false}
          //color="yellow"
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center" }}
        />
        <br/>
        </div>

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
          border-color="warning"
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center",width:"95%" }}
        />

        <br/>
        <TextField
          id="outlined-basic"
          //id="outlined"
          label={"הערות"}
          name={"Note"}
          type={"text"}
          {...register("Note")}
          variant="outlined"
          disabled={false}
          //color="yellow"
          style={{ backgroundColor: "#ebedf0", margin: 20, textAlign: "center" }}
        />
        <br/>

       <Button variant="contained" type="submit">
          שלח
        </Button>
     </form>
     
    
    </>
  )
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





