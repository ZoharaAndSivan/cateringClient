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
//ייבוא קומפוננטת דף יצירת קשר
import ContactUs from "./components/ContactUs";

import Register from "./components/Register";
import Login from "./components/Login";

import Menu from "./components/Menu";
import MenuType from "./components/MenuType";
import FoodType from "./components/FoodType";
function App() {
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
        <Route path="foodType/:id/:menuId" element={<FoodType />} />
        <Route path="menu/:id" element={<Menu />} />
        <Route path="menuType/:id" element={<MenuType />} />
        <Route path="home/eventsCatering" element={<Menu />} />
        <Route path="about" element={<About />} />
        <Route path="recommendation" element={<Recommendation />} />
        <Route path="contactUs" element={<ContactUs />} />

        {/* <Route path='ezorIshi' element={<Login/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
