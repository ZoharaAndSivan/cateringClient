import { useNavigate } from 'react-router-dom';
//קומפוננטה שמציגה כל כרטיס אירוע
// סוג אירוע בודד - כרטיס בדף הבית
export default function EventType({eventType}) {
    const navigate = useNavigate();
    return <div
      className="box"
    //   onClick={() => { navigate("/menu/"+eventType.id+"/"+eventType.Name)
      onClick={() => { navigate("/menuType/"+eventType.Id)
      }}
    >
    {eventType.Name}
    </div>
}