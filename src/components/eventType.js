import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Swal from "sweetalert2";

//קומפוננטה שמציגה כל כרטיס אירוע
// סוג אירוע בודד - כרטיס בדף הבית
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
    if(name=="") {
      Swal.fire({
        title: "אופס...",
        text: "יש להזין שם אירוע",
        icon: "warning",
      });
      return;
    }
    eventType.Name = name;
    updateEvent(eventType);
    setIsEdit(false)
  };

  return (
    <div className="box">
      {isEdit ? (
        <TextField
          id="outlined-basic"
          label="שם אירוע"
          variant="outlined"
          defaultValue={eventType.Name}
          onChange={(e)=>setName(e.target.value)}
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

      {currentUser?.UserType == 1 && (
        <div>
          <span className="ms-2">
            <EditIcon onClick={update} />
          </span>
          <DeleteIcon onClick={() => deleteEvent(eventType)} />
        </div>
      )}
    </div>
  );
}
