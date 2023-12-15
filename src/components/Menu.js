import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import "./Menu.scss";
import SideNavBar from "./SideNavBar";
import FoodType from "./FoodType";
import CategoryList from "./CategoryList";
import { Button } from "@mui/material";
import DisplayOrderProducts from "./DisplayOrderProducts";
import { getAllFoodByMenuId } from "../store/action/event";

export default function MenuEvent({ type }) {
  //מקבלת אי די לפי שורת יו אר אל
  const { id, date, amount, time } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [food, setFood] = useState([]);
  const [foodTypeId, setFoodTypeId] = useState(1);
  const [menuEvent, setMenuEvent] = useState([]);
  const [menu, setMenu] = useState([]);
  //שליפה
  const { eventsType, menuTypes, menusEvents, editOrder } = useSelector(
    (state) => {
      return {
        eventsType: state.catering.eventsTypes,
        menuTypes: state.catering.menuTypes,
        menusEvents: state.catering.menusEvents,
        editOrder: state.order.editOrder,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    setEvent(menusEvents.find((x) => x.Id == id)); //מחזיר אובייקט
    let arr = menuTypes.filter((x) => x.MenuId == id);
    arr = arr.map((obj) => ({ ...obj, AmountChosen: 0 }));
    setMenuEvent(arr); //מחזיר מערך
    console.log(arr, "lllllllllllll");

    getAllFoodByMenuId(id)
    .then((response) => {
      setFood(response.data);
      console.log(response.data)
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

  const deleteFood = (item) => {
    if (menu.find((x) => x.Id == item.Id)) {
      let arr = [...menu];
      arr = arr.filter((x) => x.Id != item.Id);
      setMenu(arr);
      changeChosenAmount(-1, item.FoodTypeId);
    }
  };

  const sendOrder = () => {
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
    {editOrder && <DisplayOrderProducts order={editOrder} food={food}/>}
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
          <Button onClick={sendOrder} variant="contained">
            סיים הזמנה
          </Button>
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
