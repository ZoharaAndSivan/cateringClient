import { useNavigate } from 'react-router-dom';
import "./EventType.scss";
//קומפוננטה שמציגה כל כרטיס אירוע
// סוג אירוע בודד - כרטיס בדף הבית
export default function EventType({eventType}) {
    const navigate = useNavigate();
    return <div
      //className="box" style={{background-image:"../../images/bar-mitzva.JPG"}}
      className="box"
    //   onClick={() => { navigate("/menu/"+eventType.id+"/"+eventType.Name)
      onClick={() => { navigate("/menuType/"+eventType.Id)
      }}
    >
    <h4 id="eventName">{eventType.Name}</h4>
    {/* <img id="imageBox" src="../../images/barmitzva.JPG"/> */}
    <img src={`../../images/${eventType.Image}`}/>
    
    
    </div>
}

