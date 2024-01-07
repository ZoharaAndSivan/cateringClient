import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Correct import for timeGridPlugin
import interactionPlugin from "@fullcalendar/interaction";
import "./CalenderCore.css";
import { CircularProgress } from "@mui/material";
import { getAllOrders } from "../../service/order";
import { useNavigate } from "react-router-dom";

export default function Calender() {
  let firstDaty = 1;
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [times, setTimes] = useState(null);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    getAllOrders()
      .then((x) => {
        const vec = x.data;
        console.log(vec);
        setOrders(vec);
        vec.forEach((element) => {
          element.id = element.Id;
          element.title = element.EventName + " " + element.MenuName;
          const [hours, minutes, seconds] = element.EventTime.split(':').map(Number);

          // Clone EventDate to avoid mutating the original object
          const newDate = new Date(element.EventDate);
          newDate.setDate(newDate.getDate() + 1);

          
          // Set the time from EventTime to the cloned date object
          newDate.setUTCHours(hours);
          newDate.setUTCMinutes(minutes);
          newDate.setUTCSeconds(seconds);
          
          // Format the date to ISO string (2024-01-04T22:00:00.000Z)
          const formattedDate = newDate.toISOString();
          console.log(element.EventDate, formattedDate,"llllllllll")
          // element.start = '2024-01-05T12:30:00';
          element.start = formattedDate;
          // element.start = element.EventDate;
        });
        setEvents(vec);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDateClick = (data) => {
    const tempArr = orders.filter(x=> new Date(x.EventDate).toLocaleDateString() == new Date(data.date).toLocaleDateString());
    console.log(tempArr)
    navigate("/ordersUserList", {
      state: { orders:tempArr },
    });
  }
  const handleClick = (data) => {
    console.log(data.event.disabled);
    console.log(data.event.start);
    if (data.event.title == "יש כרטיסים") {
      const date = new Date(data.event.start);
      console.log(date);
    } else setTimes(null);
  };

  return (
    <div style={{ margin: "2.5rem" }}>
      <div className="App">
        {events.length === 0 ? (
          <div className="circular-progress">
            <CircularProgress />
          </div>
        ) : (
          <FullCalendar
            timeZone="UTC"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // initialView="timeGridWeek"
            eventDisplay="block"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            displayEventTime={false}
            locale="he" // Set your desired locale, e.g., 'he' for Hebrew
            buttonText={{
              today: "היום",
              month: "חודש",
              week: "שבוע",
              day: "יום",
            }}
            // allDayText={false}
            allDaySlot={false}
            dateClick={(data)=>handleDateClick(data)}
            allDayText="כל היום" // Customize 'All Day' text if needed
            // Add more configuration options as per your requirements
          />
        )}
      </div>
    </div>
  );
}
