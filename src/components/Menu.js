import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import "./Menu.scss";
import SideNavBar from "./SideNavBar";
import FoodType from "./FoodType";
import CategoryList from "./CategoryList";
import { Button } from "@mui/material";

export default function MenuEvent() {
  //מקבלת אי די לפי שורת יו אר אל
  const { id, date, amount, time } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [foodTypeId, setFoodTypeId] = useState(1);
  const [menuEvent, setMenuEvent] = useState([]);
  const [menu, setMenu] = useState([]);
  const [price, setPrice] = useState(0);
  //שליפה
  const { eventsType, menuTypes, menusEvents } = useSelector((state) => {
    return {
      eventsType: state.catering.eventsTypes,
      menuTypes: state.catering.menuTypes,
      menusEvents: state.catering.menusEvents
    };
  }, shallowEqual);

  useEffect(() => {
    setEvent(menusEvents.find((x) => x.Id == id)); //מחזיר אובייקט
    let arr = menuTypes.filter((x) => x.MenuId == id);
    arr = arr.map((obj) => ({ ...obj, AmountChosen: 0 }));
    setMenuEvent(arr); //מחזיר מערך
    setPrice(event?.Price);
  }, [event]);

  const change = (e, item) => {
    let obj = [...menu];

    if (e.target.checked) {
      obj = [...obj, item];
    } else {
      obj = obj.filter((x) => x.Id != item.Id);
    }
    setMenu(obj);
    console.log(obj, "llllllllllllllllllllllllll");
  };
  const changeChosenAmount = (value, id) => {
    let arr = [...menuEvent];
    const index = menuEvent.findIndex((x) => x.FoodTypeId.Id === id);
    console.log(menuEvent, index);
    if (index != -1) {
      arr[index].AmountChosen = arr[index].AmountChosen + value;
    }
    setMenuEvent(arr);
  };
  const addFood = (item) => {
    if (!menu.find((x) => x.Id == item.Id)) {
      let arr = [...menu];
      arr = [...arr, item];
      setMenu(arr);
      changeChosenAmount(1, item.FoodType);
    }
  };

  const deleteFood = (item) => {
    if (menu.find((x) => x.Id == item.Id)) {
      let arr = [...menu];
      arr = arr.filter((x) => x.Id != item.Id);
      setMenu(arr);
      changeChosenAmount(-1, item.FoodType);
    }
  };

  const sendOrder = () => {
    console.log(menu);
    const groupedMenu = Object.entries(
      // What you have done
      menu.reduce((acc, { Id, FoodType, Active, Name, Price }) => {
        // Group initialization
        if (!acc[FoodType]) {
          acc[FoodType] = [];
        }
        
        // Grouping
        // FIX: only pushing the object that contains id and value
        acc[FoodType].push({ Id, Active, Name, Price, FoodType });
    
        return acc;
      }, {})
    ).map(([type, options]) => ({ type, options }));
    menu.sort((a, b) => a.FoodType - b.FoodType);

    console.log(groupedMenu);
    console.log(event,"eventttt")
    navigate("/summaryOrder", { state: { groupedMenu, menu, date, amount, event, time, menuEvent } });

  };
  // console.log(menuTypes);
  // console.log(menuEvent);

  return (
    <>
      <div className="row">
        <div className="containers" style={{ width: "20%" }}>
          <div>
        <p>
        <PeopleIcon /> {amount} אורחים 
        </p>
        <p>
        <CalendarMonthIcon /> {new Date(date).toLocaleDateString()} 
        </p>
        </div>
          <h5> מסלול קיטרניג מחיר לסועד </h5>
          {menuEvent.map((item) => (
            <div key={item.Id}>
              <CategoryList
                category={item}
                menu={menu}
                sendOrder={sendOrder}
                deleteFood={deleteFood}
              />
            </div>
          ))}
      <Button onClick={sendOrder} variant="contained"> סיים הזמנה </Button>
        </div>
        <div className="containers" style={{ width: "10%" }}>
          <SideNavBar
            menuEvent={menuEvent}
            setFoodTypeId={setFoodTypeId}
            sendOrder={sendOrder}
          />
        </div>
        <div className="containers" style={{ width: "60%" }}>
          <FoodType
            menuId={id}
            foodTypeId={foodTypeId}
            menu={menu}
            addFood={addFood}
            deleteFood={deleteFood}
          />
        </div>
      </div>
    </>
  );
}
