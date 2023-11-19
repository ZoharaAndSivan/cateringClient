import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//קומפוננטה שמציגה כל כרטיס אירוע
// סוג אירוע בודד - כרטיס בדף הבית
export default function EventType({ eventType }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div
      className="box"
      //   onClick={() => { navigate("/menu/"+eventType.id+"/"+eventType.Name)
      onClick={() => {
        navigate("/menuType/" + eventType.Id);
      }}
    >
      {eventType.Name}
      {/* {currentUser?.UserType == 1 && (
        <>
          <Button variant="contained"> עדכן שם </Button>
          <Button variant="contained"> מחק </Button>
        </>
      )} */}
    </div>
  );
}
