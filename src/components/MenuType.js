import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MenuTypeSingle from "./MenuTypeSingle";
import "./ScssComponets/MenuType.scss";
import Swal from "sweetalert2";
import { updateActiveMenuType } from "../service/event";
import { saveMenuEvents } from "../store/action/event";
import { Button } from "@mui/material";


import ContactUs from "./ContactUs";

export default function MenuType() {
  //אידי סוג אירוע
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menusTypes, setMenuTypes] = useState([]);
  const [event, setEvent] = useState(null);
  const {menusEvents, eventsTypes, user}  = useSelector((state) => {
    return{
      //תפריטי אירועים
      menusEvents: state.catering.menusEvents,
      //סוגי אירועים
      eventsTypes: state.catering.eventsTypes,
      //משתמשים
      user: state.user.currentUser
    }
  },shallowEqual);

  useEffect(() => {
    //שולף את כל סוגי התפריטים של אירוע מסוים שנבחר
    const arr = menusEvents.filter((x) => x.EventId == id && x.Active.data[0]==true);
    setMenuTypes(arr);
    //האירוע שנבחר
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

    <div className="imageMenu" >
      <p className="menuP">Menu</p>
      <br/>
      <div className="divEventName">
      <h2 className="mazalTov">{event?.Details}</h2>
      <h3 className="h3-mazalTov"> 
                                                                              
          אצלינו תמצאו את התפריט שיתאים בדיוק עבורכם </h3>
    </div> 
    </div>
    
     




    {/* <div style={{height:"50px"}}></div> */}
   
    <div  className="bigDivType">
    {/* מנהל */}
    {user?.UserType==1 && <Button variant="contained" onClick={addMenuEvent}> הוסף תפריט </Button>}
    
      <div className="row">
        {/* סוגי תפריטים */}
        {menusTypes.length>0 && menusTypes.map((item) => (
          <>
          <div key={item.id} className="containers">
            <MenuTypeSingle menu={item} deleteMenuType={deleteMenuType}/>
            
          </div>
          </>
        ))}

      </div>
    </div>

    <div>
        <h2 >מתלבטים? אנחנו נעזור לכם</h2>
      </div>


      <br/>
      <ContactUs/>
    </>
  );
}
