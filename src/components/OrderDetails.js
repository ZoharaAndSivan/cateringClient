import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupedMenu, menu, amount, date, event, time, price } =
    location.state || {};
    const user = useSelector(state=> state.catering.user);
  const schema = yup
    .object({
      FirstName: yup.string().required("שדה זה חובה"),
      LastName: yup.string().required("שדה זה חובה"),
      Phone: yup
        .string()
        .required("שדה זה חובה")
        .min(9, "מספר הפלאפון אינו תקין")
        .max(10, "מספר הפלאפון אינו תקין"),
      Adress: yup.string().required("שדה זה חובה"),
      Email: yup.string().required("שדה זה חובה"),
      EventPlace: yup.string().required("שדה זה חובה"),
      Notes: yup.string(),
    })
    .required();

  const orderDetails = [
    { lableName: "שם פרטי ", name: "FirstName", type: "text" },
    { lableName: "שם משפחה", name: "LastName", type: "text" },
    { lableName: "טלפון", name: "Phone", type: "text" },
    { lableName: "כתובת מייל", name: "Email", type: "text" },
    { lableName: "כתובת לקוח", name: "Adress", type: "text" },
    { lableName: "כתובת אירוע", name: "EventPlace", type: "text" },
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
    // const user = {
    //   FirstName: data.FirstName,
    //   LastName: data.LastName,
    //   Phone: data.Phone,
    //   Adress: data.Adress,
    //   Email: data.Email,
    //   UserType: user.currentUser?user.currentUser.UserType:3,
    //   Active: true,
    // };
    // const order = {
    //   MenuId: event.Id,
    //   NumberPeople: amount,
    //   OrderDate: new Date(),
    //   EventDate: date,
    //   EventPlace: data.EventPlace,
    //   EventTime: time,
    //   FullPrice: price,
    //   Note: data.Note,
    // };
    // const details = { user, order, menu };
    // console.log(details);
    // Swal.fire({
    //   title: "הזמנתך בוצעה בהצלחה!",
    //   text: "פרטי הזמנה נשלחו לך למייל.",
    //   icon: "success",
    //   confirmButtonText: "סיים",
    // }).then((result) => {
    //   navigate("/");
    // });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4> פרטי הזמנה: </h4>
        {/* Id, FirstName, LastName, Phone, Adress, Email, Password, UserType, Active */}
        {/* Id, UserId, MenuId,NumberPeople, OrderDate, EventDate, EventPlace, EventTime, ArrivalTime, FullPrice, Note, IsClose */}
        {orderDetails.map((item) => (
          <>
            <label> {item.lableName} </label> <br />
            <FormInput
              name={item.name}
              type={item.type}
              errors={errors}
              register={register}
              flag={false}
            />
          </>
        ))}
        <br /> <br />
        <h4> מידע נוסף </h4>
        <label> הערות להזמנה (אופציונלי) </label> <br /> <br />
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          {...register("Note")}
          variant="filled"
        />
        <p> מחיר סופי: {price.toLocaleString()} </p>
        <Button variant="contained" type="submit">
          שליחת הזמנה
        </Button>
      </form>
    </>
  );
}
