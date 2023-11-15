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

                <li ><Link to="about">אודות  |</Link></li>
                <li ><Link to="recommendation">המלצות  |</Link></li>
                <li ><Link to="contactUs">צור קשר  |</Link></li>
                <img  id="prophil" src="../../images/פרופיל משתמש.svg"/>
            </ul>
            
        </nav>
        </div>
    </>

}