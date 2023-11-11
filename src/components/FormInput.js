import TextField from "@mui/material/TextField";
import React from "react";
const FormInput = ({
  register,
  errors,
  name,
  lableName,
  type,
  flag,
  onChange,
}) => {
  return (
    <>
      <TextField
        id="outlined"
        label={lableName}
        name={name}
        type={type}
        {...register(name)}
        variant="outlined"
        disabled={flag}
        // onChange={(e)=>{if(name=="NumberDishes") onChange(e)}}
        style={{ backgroundColor: "#ebedf0" }}
      />
      <br /> <span style={{ color: "red" }}>{errors[name]?.message}</span> <br/>
    </>
  );
};
export default FormInput;
