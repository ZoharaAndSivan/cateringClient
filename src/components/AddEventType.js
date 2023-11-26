import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Switch, TextField } from "@mui/material";
import { addEventType } from "../service/event";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertMessage from "./AlertMessage";
import Alerts from "./Alerts";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddEventType() {
  const schema = yup
    .object({
      Name: yup.string().min(2, "שם קצר מידי").required("שדה זה חובה"),
      Details: yup.string().required("שדה זה חובה"),
      Active: yup.bool(),
      Image: yup.mixed().required("שדה זה חובה"),
    })
    .required();

  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const handleOpen = () => {setOpen(true); setFlag(false);};
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    setFlag(false);

  },[])

  const onSubmit = (data) => {
    console.log(data);
    data.Image = data.Image["0"]?.name;
    addEventType(data)
      .then((x) => {
        console.log(x.data);
        setFlag(true);
        setTimeout( ()=> {reset(); handleClose(); }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddCircleOutlineIcon style={{ cursor: "pointer" }} /> הוסף אירוע
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            הכנס פרטי אירוע
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <TextField
                variant="outlined"
                label="שם אירוע"
                {...register("Name")}
                type="text"
              />
              <br />
              <span style={{ color: "red" }}>{errors.Name?.message}</span>{" "}
              <br />
              <TextField
                variant="outlined"
                label="פרטים"
                {...register("Details")}
                type="text"
              />
              <br />
              <span style={{ color: "red" }}>
                {errors.Details?.message}
              </span>{" "}
              <br />
              <input className="pe-5 me-4" {...register("Image")} type="file" />
              <br />
              <span style={{ color: "red" }}>{errors.Image?.message}</span>{" "} <br/>
              <Switch
                {...register("Active")}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              פעיל
              <br /> <br />
              {!flag ? (
                <Button variant="contained" type="submit">
                  הוסף
                </Button>
              ) : (
                <AlertMessage
                  variant={"success"}
                  setFlag={setFlag}
                  children={<Alerts message={"התווסף בהצלחה!"} />}
                />
              )}
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
