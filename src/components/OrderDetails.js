import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function OrderDetails() {
  const location = useLocation();
  const { groupedMenu, menu, amount, date, event } = location.state || {};

  const schema = yup
    .object({
      FirstName: yup.string().required("שדה זה חובה"),
      LastName: yup.string().required("שדה זה חובה"),
      Phone: yup
        .string()
        .required("שדה זה חובה")
        .min(9, "מספר הפלאפון אינו תקין")
        .max(10, "מספר הפלאפון אינו תקין"),
      Date: yup
        .date()
        .min(new Date(), "תאריך לא תקין")
        .typeError("שדה זה חובה")
        .required("שדה זה חובה"),
      Address: yup.string().required("שדה זה חובה"),
      Notes: yup.string(),
    })
    .required();
  //להוסיף כתובת מגורים כדי שיכנס לטבלת משתמשים אם צריך
  const arr = [
    { lableName: "שם פרטי ", name: "FirstName", type: "text" },
    { lableName: "שם משפחה", name: "LastName", type: "text" },
    { lableName: "טלפון", name: "Phone", type: "string" },
    { lableName: "תאריך אירוע", name: "Date", type: "date" },
    { lableName: "כתובת", name: "Adress", type: "text" },
    // { lableName: " מחיר סופי", name: "Price", type: "number" },
    // { lableName: "הערות", name: "Notes", type: "text" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2> פרטי הזמנה: </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {arr.map((item) => ( <>
        <label> {item.lableName} </label> <br/>
          <FormInput
            name={item.name}
            type={item.type}
            errors={errors}
            register={register}
            flag={false}
          />
          </>
        ))}
        
        <Button variant="contained" type="submit">
          שלח
        </Button>
      </form>
    </>
  );
}
