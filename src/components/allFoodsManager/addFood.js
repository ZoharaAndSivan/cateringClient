import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import * as yup from "yup";
import FormInput from "../FormInput";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";

const schema = yup
  .object({
    Name: yup.string().min(2).required("שדה זה חובה"),
    Price: yup
      .number()
      .positive("מספר לא תקין")
      .typeError("שדה זה חובה")
      .required("שדה זה חובה"),
    Active: yup.bool().required("שדה זה חובה"),
    Image: yup.mixed()
  })
  .required();

const arr = [
  { lableName: "שם המאכל", name: "Name", type: "text", flag: false },
  { lableName: "מחיר המאכל", name: "Price", type: "number", flag: false },
  { lableName: "האם פעיל", name: "Active", type: "checkbox", flag: false },
];

const AddFood = ({ onSubmit, food }) => {
  const [image, setImage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { food },
  });
  useEffect(() => {
    if (food) {
      arr.forEach((x) => setValue(x.name, food[x.name]));
    }
  }, [food]);

  useEffect(() => {
    if (food) {
      setImage(food.Image);
    } else{
        setImage("לא נבחר קובץ")
    }
  }, []);

  return (
    <div style={{ paddingRight: "70px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {arr.map((item) => (
          <FormInput
            lableName={item.lableName}
            name={item.name}
            type={item.type}
            errors={errors}
            register={register}
            expense={food}
            flag={false}
          />
        ))}
        <IconButton aria-label="upload picture" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0].name);
              setValue("Image", e.target.files[0].name);
            }}
          />
          <AddPhotoAlternateIcon />
        </IconButton>
        {image}
        <br />
        <span style={{ color: "red" }}>{errors.Image?.message}</span> <br />
        <div className="row gx-0 col-8">
          <Button
            variant="contained"
            style={{ backgroundColor: "#94db9f", fontSize: "15px" }}
            type="submit"
            className=""
          >
            הוסף
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddFood;
