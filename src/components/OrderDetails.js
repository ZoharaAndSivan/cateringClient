import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveEditOrder } from "../store/action/order";
import { addOrder, deleteOrder } from "../service/order";

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { groupedMenu, menu, amount, date, event, time, price } =
    location.state || {};
  const { user, editOrder } = useSelector((state) => {
    return {
      user: state.user.currentUser,
      editOrder: state.order.editOrder,
    };
  }, shallowEqual);
  
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
      Note: yup.string(),
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
    defaultValues: { user, editOrder },
  });

  useEffect(() => {
    if (editOrder || user) {
      const userNames = Object.keys(user);
      orderDetails.forEach((x) => {
        if (userNames.find((y) => y == x.name)) {
          setValue(x.name, user[x.name]);
        } else {
          setValue(x.name, editOrder[x.name]);
        }
      });
    }
  }, [user, editOrder]);

  const deleteOldOrder = () => {
    deleteOrder(editOrder.Id)
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err))
  }

  const add = (details) => {
    addOrder(details)
      .then((response) => {
        Swal.fire({
          title: "הזמנתך בוצעה בהצלחה!",
          text: "פרטי הזמנה נשלחו לך למייל.",
          icon: "success",
          confirmButtonText: "סיים",
        }).then((result) => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    console.log(data);
    const user2 = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Phone: data.Phone,
      Adress: data.Adress,
      Email: data.Email,
      UserType: user ? user.UserType : 3,
      Active: true,
      Id: user?.Id,
    };
    const order = {
      MenuId: event.Id,
      NumberPeople: amount,
      OrderDate: new Date(),
      EventDate: date,
      EventPlace: data.EventPlace,
      EventTime: time,
      FullPrice: price,
      Note: data.Note,
    };
    const details = { user: user2, order, menu };
    console.log(details);
    if (editOrder) {
      dispatch(saveEditOrder(null));
      deleteOldOrder();
    }
    add(details);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4> פרטי הזמנה: </h4>
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
          defaultValue={editOrder ? editOrder.Note : null}
        />
        <p> מחיר סופי: {price.toLocaleString()} </p>
        <Button variant="contained" type="submit">
          שליחת הזמנה
        </Button>
      </form>
    </>
  );
}
