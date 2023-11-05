import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContactUs from "./ContactUs";
import EventType from "./eventType";
import "./Home.scss";
export default function Home() {
  //שולף מהרדיוסר את טבלץ סוגי אירועים
  const eventsTypes = useSelector((state) => state.catering.eventsTypes);
  console.log(eventsTypes);

  return (
    <>
      <h1>home</h1>
      {/* תמונות עם קישורים */}
      {eventsTypes.map((item, index) => {
        return (
          <div key={item.id}>
            <EventType eventType={item} />
          </div>
        );
      })}

      <ContactUs />
    </>
  );
}
