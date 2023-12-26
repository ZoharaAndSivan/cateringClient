//ייבוא סיפריות
//מאפשר ניתובים
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
//ייבוא קומפוננטתת נב בר
import NavBar from "./components/NavBar";
// ייבוא קומפוננטת דף הבית
import Home from "./components/Home";

// ייבוא קומפוננטת דף אודות
import About from "./components/About";
//ייבוא קומפוננטת דף  המלצות
import Recommendation from "./components/Recommendation";
import SubNavBar from "./components/SubNavBar";
//ייבוא קומפוננטת דף יצירת קשר
import ContactUs from "./components/ContactUs";
import Register from "./components/Register";
import Login from "./components/Login";
import Menu from "./components/Menu";
import MenuType from "./components/MenuType";
import FoodType from "./components/FoodType";
import SummaryOrder from "./components/SummaryOrder";
import OrderDateAndAmount from "./components/OrderDateAndAmount";
import OrderDetails from "./components/OrderDetails";

import OrderUserList from "./components/OrdersUserList";
import { getEventsType, getMenuEvents, getMenuTypes } from "./service/event";
import {
  saveEventsType,
  saveMenuEvents,
  saveMenuTypes,
} from "./store/action/event";
import ContactManager from "./components/ContactManager";
import AllFoods from "./components/allFoodsManager/allFoods";
import AddEventType from "./components/AddEventType";
import AddMenuEventType from "./components/addMenuTypeEventType/AddMenuEventType";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // השליפה
    getMenuTypes()
      .then((res) => {
        console.log(res.data);
        dispatch(saveMenuTypes(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("error details2");
      });

    getEventsType()
      .then((res) => {
        console.log(res.data);
        dispatch(saveEventsType(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("error details1");
      });

    getMenuEvents()
      .then((res) => {
        console.log(res.data);
        dispatch(saveMenuEvents(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("error details3");
      });
  }, []);
  return (
    <div className="App">
      <NavBar />
      {/* <Menu/> */}
      {/* <Register/> */}
      {/* <Login/> */}
      {/*<AllFoods/>*/}
      {/* תגית שעוטפת את כל הניתובים */}
      <Routes>
        ניתוב לכל קומפוננטה
        {/* דף הבית */}
        <Route path="/" element={<Home />} />
        <Route path="home/" element={<Home />} />

        {/* דף תפריט לפי אי די אירוע */}
        <Route path="menuType/:id" element={<MenuType />} />

        {/* הולכת לדף עם אי די אירוע וכמות המוזמנים המינימלית לבדיקה */}
        <Route
          path="orderDateAndAmount/:id/:min"
          element={<OrderDateAndAmount />}
        />

        {/* ניגש לתפריט עם אי די אירוע תאריך כמות ושעה */}
        <Route
          path="menu/:id/:date/:amount/:time"
          element={<Menu type={"new"} />}
        />

        {/* סיכום הזמנה */}
       <Route path="/summaryOrder" element={<SummaryOrder />} />

        {/* טופס הזמנה */}
        <Route path="orderDetails" element={<OrderDetails />} />











       {/* המלצות- חוות דעת */}
       <Route path="recommendation" element={<Recommendation />} />
       
       צור קשר - משתמש
       <Route path="contactUs" element={<ContactUs />} />
       <Route path="login" element={<Login />} />


       <Route path="menu/:id/:date/:amount/:time" element={<Menu type={"new"}/>} />
        <Route path="menu/:id/:date/:amount/:time/:orderId" element={<Menu type={"edit"}/>} />

        <Route path="/ordersUserList" element={<OrderUserList />} />
        <Route path="/editEventType/:id" element={<AddEventType />} />
        
        <Route path="/addMenuEventType/:eventId" element={<AddMenuEventType />} />
        <Route path="/addMenuEventType/:menuId/:type" element={<AddMenuEventType />} />
        <Route path="foodType/:menuId/:foodTypeId" element={<FoodType />} />
       
       
        <Route path="menuType/:id" element={<MenuType />} />
        <Route path="home/eventsCatering" element={<Menu />} />
        
        <Route path="about" element={<About />} />
        
        
        
        <Route path="allFoods" element={<AllFoods />} />
        <Route path="contact" element={<ContactManager/>} />

        <Route path='ezorIshi' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
