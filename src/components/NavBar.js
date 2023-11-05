import { Link } from "react-router-dom"
import './NavBar.scss'
export default function NavBar() {
    return <>
    <div className="div-nav">

        <nav>
            <ul>
                <li ><Link to="home">ראשי</Link></li>

                <li className="dropdown" ><Link to="eventsCatering" className="dropbtn">קייטרינג אירועים</Link>
                    <div className="dropdown-content">
                        <Link to="eventsCatering">בר מצווה</Link>
                        <Link to="eventsCatering">חתונה</Link>
                        <Link to="eventsCatering">חינה</Link>
                    </div>
                </li>

                <li ><Link to="about">אודות</Link></li>
                <li ><Link to="recommendation">המלצות</Link></li>
                <li ><Link to="contactUs">צור קשר</Link></li>
            </ul>
        </nav>
        </div>
    </>

}