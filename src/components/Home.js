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

      {/* <div className='homePage cover top-banner d-flex align-items-center center p-0'>
                <div class="sm-txt mt-4 pe-5">
                    <h1 style={{ fontWeight: "100px", fontSize: "60px" }}><strong>HOUSEMENT</strong></h1>
                    <h2 style={{ fontWeight: "50px" }}><strong> החיבור שלכם לאיכות חיים </strong></h2>
                </div>
                <img src="https://tidhar.co.il/wp-content/uploads/2020/10/תדהר-שרת-תל-אביב-חוץ-2-e1668588621433.jpg" className='cover-image' />
            </div> */}
      {/* תמונות עם קישורים */}
      <div id="divHomeImage">
      <img id="HomeImage" src="../../images/HomeImage.jpg"/>
      <p>קייטרינג בוטיק לאירוע המושלם - חוויה בטעמים נפלאים</p>
      </div>

      {eventsTypes.map((item, index) => {
        return (
          <div key={item.id}  className="divallEvent">
            <EventType eventType={item} />
          </div>
        );
      })}
       
      {/* <ContactUs /> */}
    </>
  );
}
