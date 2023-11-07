import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Menu.scss";
import SubMenu from "./SubMenu";
import Order from "./Order";
import SideNavBar from "./SideNavBar";
import FoodType from "./FoodType";
import CategoryList from "./CategoryList";

export default function MenuEvent() {
  //מקבלת אי די לפי שורת יו אר אל
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [foodTypeId, setFoodTypeId] = useState(1);
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

  // console.log(menuTypes);
  // console.log(menuEvent);

  return (
    <>
      <div className="row">
        <div className="containers" style={{ width: "20%" }}>
          <h5> מסלול קיטרניג מחיר לסועד </h5>
          {menuEvent.map((item) => (
            <div key={item.Id}>
             <CategoryList category={item} menu={menu} deleteFood={deleteFood}/>
            </div>
          ))}
        </div>
        <div className="containers" style={{ width: "10%" }}>
          <SideNavBar menuEvent={menuEvent} setFoodTypeId={setFoodTypeId} />
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
