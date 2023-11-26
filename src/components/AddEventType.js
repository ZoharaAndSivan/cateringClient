import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TextField } from "@mui/material";
import { addEventType } from "../service/event";

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
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const add = () => {
    if (name.length < 2) {
      setError("יש להכניס שם אירוע לפחות שני תווים");
    } else {
       console.log(name);
       addEventType(name)
       .then(x=>{
        console.log(x.data);
       })
       .catch(err=>console.log(err))
    }
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
            הכנס שם אירוע
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              label="שם אירוע"
              onChange={(e) => { if(e.target.value.length > 2) setError(""); setName(e.target.value)}}
            /> <br/>
            <span style={{color:"red"}} >{error}</span> <br/> <br/>
            <Button variant="contained" onClick={add} disabled={name.length<2}>
              הוסף
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
