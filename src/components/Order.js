import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Order({ event }) {
  const min = event.Minimum;
  console.log(event.Minimum, min)
  
  const schema = yup
    .object({
      FirstName: yup.string().required("שדה זה חובה"),
      LastName: yup.string().required("שדה זה חובה"),
      Phone: yup
        .string()
        .required("שדה זה חובה")
        .min(9, "מספר הפלאפון אינו תקין")
        .max(10, "מספר הפלאפון אינו תקין"),
        
        Date: yup.date().min(new Date(), "תאריך לא תקין").typeError("שדה זה חובה").required("שדה זה חובה"),
      Address: yup.string().required("שדה זה חובה"),
      Price: yup
        .number()
        .min(0, "מחיר לא תקין")
        .typeError("שדה זה חובה")
        .required("שדה זה חובה"),
      NumberDishes: yup
        .number().min(min, "מינימום מספר מנות " + min)
        .positive("מספר לא תקין")
        .typeError("שדה זה חובה")
        .required("שדה זה חובה"),
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
    { lableName: "מספר מנות ", name: "NumberDishes", type: "number" },
    { lableName: " מחיר סופי", name: "Price", type: "number" },
    { lableName: "הערות", name: "Notes", type: "text" },
  ];

  const [calculatedPrice, setCalculatedPrice] = useState(0);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {arr.map((item) => (
          <FormInput
            lableName={item.lableName}
            name={item.name}
            type={item.type}
            errors={errors}
            register={register}
            flag={false}
            // onChange={(e) => {
            //   const numberOfDishes = parseInt(e.target.value) || 0; // Parse as integer, default to 0 if not a valid number
            //   const newPrice = numberOfDishes * event.Price; // Calculate the new price
            //   console.log(newPrice);
            //   setCalculatedPrice(newPrice); // Update the calculatedPrice state
            // }}
          />
        ))}
        <TextField
          id="outlined"
          label={"מחיר"}
          name={"Price"}
          type={"number"}
          {...register("Price")}
          variant="outlined"
          disabled={true}
          value={calculatedPrice}
          style={{ backgroundColor: "#ebedf0" }}
        />
        <Button variant="contained" type="submit">
          שלח
        </Button>
      </form>
    </>
  );
}
