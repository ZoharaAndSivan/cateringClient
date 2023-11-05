import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Menu.scss";
import SubMenu from "./SubMenu";
import Order from "./Order";
import SideNavBar from "./SideNavBar";

export default function MenuEvent() {
  //מקבלת אי די לפי שורת יו אר אל
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [menuEvent, setMenuEvent] = useState([]);
  const [menu, setMenu] = useState([]);
  const [price, setPrice] = useState(0);
  //שליפה
  const { eventsType, menuTypes } = useSelector((state) => {
    return {
      eventsType: state.catering.eventsTypes,
      menuTypes: state.catering.menuTypes,
    };
  }, shallowEqual);
  useEffect(() => {
    setEvent(eventsType.find((x) => x.id == id)); //מחזיר אובייקט
    setMenuEvent(menuTypes.filter((x) => x.MenuId == id)); //מחזיר מערך
    setPrice(event?.Price);
  }, [event]);

  const change = (e, item) => {
    let obj = [...menu];

    if (e.target.checked) {
      obj = [...obj, item];
    } else {
      obj = obj.filter((x) => x.id != item.id);
    }
    setMenu(obj);
    console.log(obj, "llllllllllllllllllllllllll");
  };

  console.log(menuTypes);
  console.log(menuEvent);

  return (
    <>
      <div className="row">
        <div className="container" style={{ width: "20%" }}>
          <h5> מסלול קיטרניג מחיר לסועד </h5>
          {menuEvent.map(item => <div> {item.FoodTypeId.Name} (x) </div>)}
        </div>
        <div className="container" style={{ width: "10%" }}>
          <SideNavBar menuEvent={menuEvent}/>
        </div>
        <div className="container" style={{ width: "60%" }}></div>
      </div>

      <div>
        <h1>תפריט</h1>
      </div>

      <div> {event?.Name}</div>

      <form>
        <div>
          {menuEvent.length > 0 &&
            menuEvent.map((item, index) => {
              return (
                <div key={item.id}>
                  <SubMenu typeMenu={item} change={change} />
                </div>
              );
            })}
        </div>
      </form>
      <hr />
      {/* {event && <Order event={event} />} */}
    </>
  );
}
