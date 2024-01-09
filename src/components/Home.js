import "./ScssComponets/Home.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { updateActiveEventType, updateEventType } from "../service/event";
import { updateEventsType } from "../store/action/event";


import Swal from "sweetalert2";


import Recommendation from "./Recommendation";
import ContactUs from "./ContactUs";


// import Register from "./Register";
// import ContactManager from "./ContactManager";

 import EventType from "./eventType";
 import AddEventType from "./AddEventType";


export default function Home() {

    //שליפת משתמשים
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  //שולף מהרדיוסר את טבלת סוגי אירועים
  const eventsTypes = useSelector((state) => state.catering.eventsTypes); 
  const [eventArr, setEventArr] = useState([]);

  useEffect(() => {
    setEventArr(eventsTypes);
  }, [eventsTypes]); 

  const updateEvent = (eventType) => {
    updateEventType(eventType.Id, eventType)
      .then((x) => {
        console.log(x.data);
        let arr = [];

        for (let i = 0; i < eventArr.length; i++) {
          const element = eventArr[i];
          if (element.Id == eventType.Id) {
            arr.push(eventType);
          } else {
            arr.push(element);
          }
        }

        dispatch(updateEventsType(arr));
      })
      .catch((err) => console.log(err));
  };

  const deleteEvent = (eventType) => {
    Swal.fire({
      title: "האם אתה בטוח?",
      text: "האם אתה בטוח שברצונך למחוק את סוג האירוע?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, למחוק את זה!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateActiveEventType(eventType.Id)
          .then((x) => {
            const arr = eventArr.filter((x) => x.Id != eventType.Id);
            setEventArr(arr);
            dispatch(updateEventsType(arr));
          })
          .catch((err) => console.log(err));
        Swal.fire({
          title: "נמחק בהצלחה!",
          text: "סוג האירוע נמחק בהצלחה!",
          icon: "success",
        });
      }
    });
  };

  return (
    <>

      <div className="divHomeImage">

        <p className="first-title">Delishes</p>

        <p className="second-title">
          קייטרינג  לאירוע מושלם - חוויה בטעמים נפלאים
        </p>

      </div>


      {/* סוגי אירועים קיימים */}
      
      {eventArr.length > 0 &&
        eventArr.map((item, index) => {
          return (
            <div key={item.id} className="divallEvent">
              <EventType
                eventType={item}
                 deleteEvent={deleteEvent}
                 //updateEvent={updateEvent}
              />
            </div>
          );
        })}

      <br/>
      <br/>
      {/* <Recommendation/> */}
      <br/>
      <br/>

      {/* מנהל-  הוספת אירוע */}


      {currentUser?.UserType == 1 && (
          
             <div className="add">
                 <AddEventType />
            </div>
         
        )}
     

      <br/>
      <ContactUs/>
      <br/>

      
      
      
 
    </>
  );
}
