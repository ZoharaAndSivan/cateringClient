// import { Button, TextField } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useState } from "react";
// import Swal from "sweetalert2";

// //קומפוננטה שמציגה כל כרטיס אירוע
// // סוג אירוע בודד - כרטיס בדף הבית
// export default function EventType({ eventType, updateEvent, deleteEvent }) {
//   const navigate = useNavigate();
//   const [isEdit, setIsEdit] = useState(false);
//   const [name, setName] = useState(eventType.Name);
//   const currentUser = useSelector((state) => state.user.currentUser);

//   const update = () => {
//     if (!isEdit) {
//       setIsEdit(true);
//       return;
//     }
//     if (name == "") {
//       Swal.fire({
//         title: "אופס...",
//         text: "יש להזין שם אירוע",
//         icon: "warning",
//       });
//       return;
//     }
//     eventType.Name = name;
//     updateEvent(eventType);
//     setIsEdit(false);
//   };

//   return (
//     <div className="box">
//       {isEdit ? (
//         <TextField
//           id="outlined-basic"
//           label="שם אירוע"
//           variant="outlined"
//           defaultValue={eventType.Name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       ) : (
//         <div
//           onClick={() => {
//             navigate("/menuType/" + eventType.Id);
//           }}
//         >
//           {eventType.Name}
//         </div>
//       )}

//       {currentUser?.UserType == 1 && (
//         <div>
//           <span className="ms-2">
//             <EditIcon onClick={update} />
//           </span>
//           <DeleteIcon onClick={() => deleteEvent(eventType)} />
//         </div>
//       )}
//     </div>
//   );
// }
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EventType({ eventType, updateEvent, deleteEvent }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(eventType.Name);
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
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={`../../images/${eventType.Image}`}
        title={eventType.Name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isEdit ? (
            <TextField
              id="outlined-basic"
              label="שם אירוע"
              variant="outlined"
              defaultValue={eventType.Name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <div
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
        {currentUser?.UserType == 1 && (
          <div>
            <span className="ms-2">
              <EditIcon onClick={update} />
            </span>
            <DeleteIcon onClick={() => deleteEvent(eventType)} />
          </div>
        )}
      </CardActions>
    </Card>
  );
}
