import "./ScssComponets/Home.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



import { updateActiveEventType, updateEventType } from "../service/event";
import { updateEventsType } from "../store/action/event";


import Swal from "sweetalert2";


 import Recommendation from "./Recommendation";
 import ContactUs from "./ContactUs";
import SubNavBar from "./SubNavBar";


// import Register from "./Register";
// import ContactManager from "./ContactManager";

 import EventType from "./eventType";
// import AddEventType from "./AddEventType";


export default function Home() {
<<<<<<< Updated upstream
  const dispatch = useDispatch();
=======
>>>>>>> Stashed changes
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
      {/* <div className='homePage cover top-banner d-flex align-items-center center p-0'>
                <div class="sm-txt mt-4 pe-5">
                    <h1 style={{ fontWeight: "100px", fontSize: "60px" }}><strong>HOUSEMENT</strong></h1>
                    <h2 style={{ fontWeight: "50px" }}><strong> החיבור שלכם לאיכות חיים </strong></h2>
                </div>
                <img src="https://tidhar.co.il/wp-content/uploads/2020/10/תדהר-שרת-תל-אביב-חוץ-2-e1668588621433.jpg" className='cover-image' />
            </div> */}

      <div className="divHomeImage">
      <p className="first-title">Delishes</p>
        <p className="second-title">
          קייטרינג  לאירוע מושלם - חוויה בטעמים נפלאים
        </p>
      </div>



      {eventArr.length > 0 &&
        eventArr.map((item, index) => {
          return (
            <div key={item.id} className="divallEvent">
              <EventType
                eventType={item}
                // deleteEvent={deleteEvent}
                // updateEvent={updateEvent}
              />
            </div>
          );
        })}

      <br/>
      <br/>
      <Recommendation/>
      <br/>
      <br/>
      <ContactUs/>
      <br/>

      
<SubNavBar/>
      {/* <div>
        <AddEventType />
      </div> */}
      
 
    </>
  );
}
