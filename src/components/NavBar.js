import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Avatar";
import "./ScssComponets/NavBar.scss";


import "./ScssComponets/Avatar.scss";
const NavBar = () => {


   //שולף מהרדיוסר את טבלת סוגי אירועים
   const eventsTypes = useSelector((state) => state.catering.eventsTypes); 
   const [eventArr, setEventArr] = useState([]);


  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  let { user } = useSelector((state) => {
    return {
      user: state.user.currentUser,
    };
  }, shallowEqual);

  useEffect(() => {
    setArr([
      { to: "/home", name: "בית", role: [0, 1, 3] },
      { to: "/eventsCatering", name: "אירועים", role: [0, 1, 3] },
      { to: "/recommendation", name: "המלצות", role: [0, 1, 3] },
      { to: "/about", name: "אודות", role: [0, 1, 3] },
      { to: "/contactUs", name: "צור קשר", role: [0, 1, 3] },
    ]);
  }, []);

  if (!user) {
    user = { UserType: 0 };
  }
  console.log(user);
  useEffect(() => {}, [user]);

  return (
    <div className="div-navbar">
      <nav className="nav-bar">
      <img  className="logoImage" src="../../images/logo.JPG.jpg" />

        <ul className="ul-navBar">
         
          {/* onClick={()=>navigate("/")} */}

          {arr.map((x) => {
            return x.role.map((item, ind) => {
              if (item == user.UserType)
                return (
                  <>
                    {/* {item.name?.name=="אירועים" && (
                    <div>
                    <select>
                    {eventArr.length > 0 &&
                      eventArr.map((item, index) => {
                      return (
                         <option value={item.id}>item.Name</option>
                         );
                        })}  
                    </select>
                    </div>
                    )} */}


                    <li key={ind} className="h-100 nav2">
                      <Link key={x.name} to={x.to} className="navBar-link">
                        {x.name} |
                      </Link>
                    </li>
                  </>
                );
            });
          })}


           <div className="user-login">
            
            
            <ResponsiveAppBar />
          </div>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
