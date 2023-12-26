import { Link } from "react-router-dom"
import "./ScssComponets/SubNavBar.scss";

export default function SubNavBar() {
    return <>
    <div className="divvvvvvvvv2">
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
        </div>
    </>

}
 