import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, Switch, TextField } from "@mui/material";
import { addEventType, updateEventType } from "../service/event";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertMessage from "./AlertMessage";
import Alerts from "./Alerts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
import { AddCircleOutlined } from "@mui/icons-material";
import { updateEventsType } from "../store/action/event";

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

const schema = yup
  .object({
    Name: yup.string().min(2, "שם קצר מידי").required("שדה זה חובה"),
    Details: yup.string().required("שדה זה חובה"),
    Active: yup.bool(),
    Image: yup.mixed(),
  })
  .required();

export default function AddEventType({id}) {
  //  const { id } = useParams();
  const dispatch = useDispatch();
  const eventsTypes = useSelector((state) => state.catering.eventsTypes);
  const [event, setEvent] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setFlag(false);
  };
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

  useEffect(() => {
    if (id) {
      const x = eventsTypes.find((x) => x.Id == id);
      setImage(x?.Image);
      setEvent(x);
    } else {
      setImage("לא נבחר קובץ");
    }
  }, [id, eventsTypes]);

  useEffect(() => {}, [event]);
  useEffect(() => {
    setFlag(false);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    data.Image = image;
    let arr = [];
    if (id) {
      updateEventType(id, data)
        .then((x) => {
          setFlag(true);
          data.Id = id;
          data.Active = { data: [data.Active] };

          for (let i = 0; i < eventsTypes.length; i++) {
            const element = eventsTypes[i];
            if (element.Id == id) {
              arr.push(data);
            } else {
              arr.push(element);
            }
          }

          dispatch(updateEventsType(arr));
          setTimeout(() => {
            //   reset();
            handleClose();
          }, 3000);
        })
        .catch((err) => console.log(err));
    } else {
      addEventType(data)
        .then((x) => {
          setFlag(true);
          arr = [...eventsTypes, x.data];
          dispatch(updateEventsType(arr));
          setTimeout(() => {
            reset();
            handleClose();
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {id?<Button onClick={handleOpen}>
      <EditIcon style={{ cursor: "pointer" }}/>
      </Button>:
      <Button onClick={handleOpen}>
        <AddCircleOutlineIcon style={{ cursor: "pointer" }} /> הוסף אירוע
      </Button>}
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
                defaultValue={event ? event.Name : null}
              />
              <br />
              <span style={{ color: "red" }}>{errors.Name?.message}</span>{" "}
              <br />
              <TextField
                variant="outlined"
                label="פרטים"
                {...register("Details")}
                type="text"
                defaultValue={event ? event.Details : null}
              />
              <br />
              <span style={{ color: "red" }}>{errors.Details?.message}</span>
              <br />
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
              <span style={{ color: "red" }}>{errors.Image?.message}</span>{" "}
              <br />
              <Switch
                defaultChecked={event ? event.Active.data[0] : null}
                {...register("Active")}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              פעיל
              <br /> <br />
              {!flag ? (
                <Button variant="contained" type="submit">
                  {id ? "ערוך" : "הוסף"}
                </Button>
              ) : (
                <AlertMessage
                  variant={"success"}
                  setFlag={setFlag}
                  children={
                    <Alerts
                      message={id ? "התעדכן בהצלחה!" : "התווסף בהצלחה!"}
                    />
                  }
                />
              )}
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
