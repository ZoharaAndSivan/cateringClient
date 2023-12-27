import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Avatar";
import "./ScssComponets/NavBar.scss";

<<<<<<< Updated upstream
const NavBar = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  let { user } = useSelector((state) => {
    return {
      user: state.user.currentUser,
    };
  }, shallowEqual);
=======
        <nav className="">
            <ul className="">
                
            <img  id="logoImage" src="../../images/logo.JPG.jpg"/>
                <li ><Link to="home">בית  |</Link></li>
>>>>>>> Stashed changes

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
                    <li key={ind} className="h-100 nav2">
                      <Link key={x.name} to={x.to} className="navBar-link">
                        {x.name} |
                      </Link>
                    </li>
                  </>
                );
            });
          })}

           
            <ResponsiveAppBar />
          
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
