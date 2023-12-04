//ייבוא סיפריות
//מאפשר ניתובים
import { Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderUserList from "./components/OrdersUserList";
import { getEventsType, getMenuEvents, getMenuTypes } from "./service/event";
import { saveEventsType, saveMenuEvents, saveMenuTypes } from "./store/action/event";
import ContactManager from "./components/ContactManager";
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

      {/* תגית שעוטפת את כל הניתובים */}
      <Routes>
        {/* ניתוב לכל קומפוננטה */}
        <Route path="/" element={<Home />} />
        <Route path="home/" element={<Home />} />
        <Route path="/ordersUserList" element={<OrderUserList />} />
        <Route path="/summaryOrder" element={<SummaryOrder />} />
        <Route path="foodType/:menuId/:foodTypeId" element={<FoodType />} />
        <Route path="menu/:id/:date/:amount/:time" element={<Menu type={"new"}/>} />
        <Route path="menu/:id/:date/:amount/:time/:orderId" element={<Menu type={"edit"}/>} />
        <Route
          path="orderDateAndAmount/:id/:min"
          element={<OrderDateAndAmount />}
        />
        <Route path="menuType/:id" element={<MenuType />} />
        <Route path="home/eventsCatering" element={<Menu />} />
        <Route path="orderDetails" element={<OrderDetails />} />
        <Route path="about" element={<About />} />
        <Route path="recommendation" element={<Recommendation />} />
        <Route path="contactUs" element={<ContactUs />} />


        <Route path="contact" element={<ContactManager/>} />

        {/* <Route path='ezorIshi' element={<Login/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
