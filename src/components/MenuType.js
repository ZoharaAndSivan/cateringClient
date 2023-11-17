import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import MenuTypeSingle from "./MenuTypeSingle";
import "./MenuType.css";

export default function MenuType() {
  const { id } = useParams();
  const menusEvents  = useSelector((state) => state.catering.menusEvents);
  const [menusTypes, setMenuTypes] = useState([]);
  useEffect(() => {
    const arr = menusEvents.filter((x) => x.EventId == id);
    setMenuTypes(arr);
  }, []);
  return (
    <div>
    
      <div className="row">
        {menusTypes.length>0 && menusTypes.map((item) => (
          <div key={item.id} className="containers">
            <MenuTypeSingle menu={item} />
            
          </div>
        ))}

      </div>
    </div>
  );
}
