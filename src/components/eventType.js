import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";

import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import AddEventType from "./AddEventType";

export default function EventType({ eventType, updateEvent, deleteEvent }) {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  //עריכה
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(eventType.Name);
  //שליפת משתמשים
  const currentUser = useSelector((state) => state.user.currentUser);

  const update = () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    if (name == "") {
      Swal.fire({
        title: "אופס...", 
        text: "יש להזין שם אירוע",
        icon: "warning",
      });
      return;
    }
    eventType.Name = name;
    updateEvent(eventType);
    setIsEdit(false);
  };

  return (
    <>

    <Card sx={{ maxWidth: 400 }}>

      {/* תמונת אירוע */}
      <CardMedia 
        sx={{ height: 200 }}
        image={`../../images/eventImages/${eventType.Image}`}
        title={eventType.Name}
        style={{height:"350px", cursor:"pointer"}}
        onClick={() => {
          navigate("/menuType/" + eventType.Id);
        }}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* עריכה */}
          {isEdit ? (
            <TextField
              id="outlined-basic"
              label="שם אירוע"
              variant="outlined"
              defaultValue={eventType.Name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            // משתמש
            
            //שם אירוע
            <div className="eventName" style={{color:"rgb(142, 110, 51)", fontSize:"35px", cursor:"pointer"}}
              onClick={() => {
                navigate("/menuType/" + eventType.Id);
              }}
            >     
              {eventType.Name} 
            </div>
          )}
        </Typography>
       
      </CardContent>
      <CardActions>
        
        {/* מנהל */}
        {currentUser?.UserType == 1 && (
          <div>
            <span className="">
             <AddEventType id={eventType.Id}/>
              {/* <EditIcon onClick={()=>setFlag(!flag)} /> */}
            </span>
            <DeleteIcon onClick={() => deleteEvent(eventType)} />
          </div>
        )}
      </CardActions>
    </Card>
    
    </>
  );
}
