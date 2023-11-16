import { Link } from "react-router-dom"
import './NavBar.scss'
export default function NavBar() {
    return <>
    <div className="div-nav">

        <nav className="">
            <ul>
            <img  id="logoImage" src="../../images/logo.JPG.jpg"/>
                <li ><Link to="home">בית  |</Link></li>

                <li className="dropdown" ><Link to="eventsCatering" className="dropbtn">אירועים  |</Link>
                </li>

<<<<<<< HEAD
                <li ><Link to="about">אודות  |</Link></li>
                <li ><Link to="recommendation">המלצות  |</Link></li>
                <li ><Link to="contactUs">צור קשר  |</Link></li>
                <img  id="prophil" src="../../images/פרופיל משתמש.svg"/>
=======
                <li ><Link to="about">אודות</Link></li>
                <li ><Link to="ordersUserList">הסטוריית הזמנות</Link></li>
                <li ><Link to="recommendation">המלצות</Link></li>
                <li ><Link to="contactUs">צור קשר</Link></li>
>>>>>>> ea7abc77cd4ffb586965d04c3307b6d7724cfded
            </ul>
            
        </nav>
        </div>
    </>

}