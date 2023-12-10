import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MenuTypeSingle from "./MenuTypeSingle";
import "./MenuType.scss";
import Swal from "sweetalert2";
import { updateActiveMenuType } from "../service/event";
import { saveMenuEvents } from "../store/action/event";
import { Button } from "@mui/material";

export default function MenuType() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menusTypes, setMenuTypes] = useState([]);
  const [event, setEvent] = useState(null);
  const {menusEvents, eventsTypes}  = useSelector((state) => {
    return{
      menusEvents: state.catering.menusEvents,
      eventsTypes: state.catering.eventsTypes
    }
  },shallowEqual);

  useEffect(() => {
    const arr = menusEvents.filter((x) => x.EventId == id && x.Active.data[0]==true);
    setMenuTypes(arr);
    setEvent(eventsTypes.find(x=>x.Id==id));
  }, [id]);

  const addMenuEvent = () => {
     navigate("/addMenuEventType/"+id)
  }

  const deleteMenuType = (menu) => {
    Swal.fire({
      title: "האם אתה בטוח?",
      text: "האם אתה בטוח שברצונך למחוק את סוג התפריט?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, למחוק את זה!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateActiveMenuType(menu.Id)
          .then((x) => {
            const arr = menusEvents.filter((x) => x.Id != menu.Id);
            setMenuTypes(menusTypes.filter(x=>x.Id!=menu.Id));
            console.log(arr,"arrr")
            dispatch(saveMenuEvents(arr));
          })
          .catch((err) => console.log(err));
        Swal.fire({
          title: "נמחק בהצלחה!",
          text: "סוג האירוע נמחק בהצלחה!",
          icon: "success",
        });
      }
    });
  }
  return (
    <>
    <div style={{height:"50px"}}></div>
    <div>
      <h2 id="mazalTov">{event?.Details}</h2>
      {/* <h2 id="mazalTov">מזל טוב!!!</h2>
      <h3 id="chogegim">חוגגים בר מצווה</h3> */}
    </div>
    <div  id="bigDivType">
    
{/* <Button variant="contained" onClick={addMenuEvent}> הוסף תפריט </Button> */}
    
      <div className="row">
        {menusTypes.length>0 && menusTypes.map((item) => (
          <>
          <div key={item.id} className="containers">
            <MenuTypeSingle menu={item} deleteMenuType={deleteMenuType}/>
            
          </div>
          </>
        ))}

      </div>
    </div>
    </>
  );
}
