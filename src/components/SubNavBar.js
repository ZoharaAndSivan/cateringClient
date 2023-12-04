import { Link } from "react-router-dom"
import "./SubNavBar.scss";

export default function SubNavBar() {
    return <>
    <div className="div-Subnav">

        <nav className="sub-nav">
            <ul className="">
                
                <li ><Link to="home">בית  |</Link></li>

                <li className="dropdown" ><Link to="eventsCatering" className="dropbtn">אירועים  |</Link>
                </li>

                <li ><Link to="about">אודות  |</Link></li>
                <li ><Link to="recommendation">המלצות  |</Link></li>
                <li ><Link to="contactUs">צור קשר  |</Link></li>
                
             
            </ul>
            
        </nav>
        </div>
    </>

}
 