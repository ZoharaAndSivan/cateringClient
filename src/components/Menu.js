import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import "./ScssComponets/Menu.scss";
import SideNavBar from "./SideNavBar";
import FoodType from "./FoodType";
import CategoryList from "./CategoryList";
import DisplayOrderProducts from "./DisplayOrderProducts";
import { getAllFoodByMenuId } from "../store/action/event";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function MenuEvent({ type }) {
  //מקבלת אי די לפי שורת יו אר אל
  const { id, date, amount, time } = useParams();
  const navigate = useNavigate();
  //אירוע
  const [event, setEvent] = useState(null);
  //מאכל
  const [food, setFood] = useState([]);
  //סוג מאכל
  const [foodTypeId, setFoodTypeId] = useState(1);
  //סוגי תפריטים לאירוע
  const [menuEvent, setMenuEvent] = useState([]);
  //תפריט
  const [menu, setMenu] = useState([]);
  //שליפה
  const { eventsType, menuTypes, menusEvents, editOrder } = useSelector(
    (state) => {
      return {
        //סוגי אירועים
        eventsType: state.catering.eventsTypes,
        //סוגי תפריטים
        menuTypes: state.catering.menuTypes,
        //סוגי תפריטים לאירוע
        menusEvents: state.catering.menusEvents,
        //עריכת הזמנה
        editOrder: state.order.editOrder,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    //סוגי תפריטים לאירועים
    //שליפת כל סוגי התפריטים לאירוע שנבחר
    setEvent(menusEvents.find((x) => x.Id == id)); //מחזיר אובייקט
    //שליפת כל הפריטיםם של סוג התפריט שנבחר
    let arr = menuTypes.filter((x) => x.MenuId == id);
    arr = arr.map((obj) => ({ ...obj, AmountChosen: 0 }));
    setMenuEvent(arr); //מחזיר מערך
    console.log(arr, "lllllllllllll");

    //שליפת המאכלים
    getAllFoodByMenuId(id)
      .then((response) => {
        setFood(response.data.filter((x) => x.Active.data[0] == true));
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [event]);

  // useEffect(()=>{
  //   if(editOrder) {
  //     for (let i = 0; i < food.length; i++) {
  //       const element = food[i];
  //       if(editOrder.Products.find(x=>x.Id==element.Id)) {
  //         addFood(element)
  //       }
  //     }
  //   }
  // })
  const changeChosenAmount = (value, id) => {
    let arr = [...menuEvent];
    const index = menuEvent.findIndex((x) => x.FoodTypeId.Id === id);
    if (index != -1) {
      arr[index].AmountChosen = arr[index].AmountChosen + value;
    }
    setMenuEvent(arr);
  };

  //בדיקה אם לא עבר את הכמות המותרת
  const isPossible = (item) => {
    const x = menuEvent.find((x) => x.FoodTypeId.Id == item.FoodTypeId);
    console.log(x, parseInt(x.Amount), parseInt(x.AmountChosen), "oooooooo");
    return parseInt(x.Amount) > parseInt(x.AmountChosen);
  };
  const addFood = (item) => {
    if (!menu.find((x) => x.Id == item.Id)) {
      let arr = [...menu];
      arr = [...arr, item];
      setMenu(arr);
      changeChosenAmount(1, item.FoodTypeId);
    }
  };

  //מחיקת נממאכל מהתפריט האישי
  const deleteFood = (item) => {
    if (menu.find((x) => x.Id == item.Id)) {
      let arr = [...menu];
      arr = arr.filter((x) => x.Id != item.Id);
      setMenu(arr);
      //מורידה בכמות בתצוגה
      changeChosenAmount(-1, item.FoodTypeId);
    }
  };

  const isFinish = () => {
    for (let i = 0; i < menuEvent.length; i++) {
      if(parseInt(menuEvent[i].Amount) > menuEvent[i].AmountChosen) {
        return false;
      }
    }
    return true;
  };

  const sendOrder = () => {
    if (!isFinish()) {
      Swal.fire({
        title: "לא סיימת להזמין",
        icon: "warning",
      });
      return;
    }

    console.log(menu);
    const groupedMenu = Object.entries(
      menu.reduce((acc, { Id, FoodTypeId, Active, Name, Price }) => {
        if (!acc[FoodTypeId]) {
          acc[FoodTypeId] = [];
        }
        acc[FoodTypeId].push({ Id, Active, Name, Price, FoodTypeId });

        return acc;
      }, {})
    ).map(([type, options]) => ({ type, options }));
    menu.sort((a, b) => a.FoodTypeId - b.FoodTypeId);

    console.log(groupedMenu);
    console.log(event, "eventttt");
    navigate("/summaryOrder", {
      state: { groupedMenu, menu, date, amount, event, time, menuEvent },
    });
  };

  return (
    <>
      {/* בזמן עריכה */}
      {editOrder && <DisplayOrderProducts order={editOrder} food={food} />}

      <div className="row">
        <div
          className="containers"
          style={{ width: "20%", border: " black 1px solid" }}
        >
          {/* כמות מוזמנים ותאריך */}
          <div>
            <p>
              <PeopleIcon /> {amount} אורחים
            </p>
            <p>
              <CalendarMonthIcon /> {new Date(date).toLocaleDateString()}
            </p>
          </div>

          <h5> מסלול קיטרניג מחיר לסועד </h5>
          {/* עוברת על סוגי המאכלים של התפריט שנבחר */}
          {menuEvent.map((item) => (
            <div key={item.Id}>
              <CategoryList
                category={item}
                menu={menu}
                //sendOrder={sendOrder}
                deleteFood={deleteFood}
              />
            </div>
          ))}

          <Button onClick={sendOrder} variant="contained">
            סיים הזמנה
          </Button>
        </div>

        {/* רשימת קטגוריות */}
        <div
          className="sideNavBar"
          style={{ width: "15%", border: " black 1px solid" }}
        >
          <SideNavBar
            menuEvent={menuEvent}
            setFoodTypeId={setFoodTypeId}
            sendOrder={sendOrder}
          />
        </div>

        <div
          className="containers"
          style={{ width: "60%", border: " black 1px solid" }}
        >
          <FoodType
            menuId={id}
            foodTypeId={foodTypeId}
            menu={menu}
            food={food}
            isPossible={isPossible}
            addFood={addFood}
            deleteFood={deleteFood}
          />
        </div>
      </div>
    </>
  );
}
