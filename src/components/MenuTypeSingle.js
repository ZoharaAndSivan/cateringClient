import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MenuTypeSingle.scss"
export default function MenuTypeSingle({ menu }) {
  const navigate = useNavigate();
  const menuTypes = useSelector((state) => state.catering.menuTypes);
  return (
    <>
      <h3 id="MenuTypeSingle3"> {menu.Name} </h3>
      <h4 id="MenuTypeSingle4"> {menu.Price} ש"ח</h4>
      <br/>
      <div>
        {menuTypes.map((item) => {
          if (item.MenuId == menu.Id)
            return (
          <>
          
              <div>
                {item.Amount == 0 ? (
                  <div>
                    {" "}
                    {item.FoodTypeId.Name} בתוספת {item.ExtraPrice} ש"ח{" "}
                  </div>
                
                  
                ) : item.ExtraPrice != 0 ? (
                  <div>
                    {item.Amount} {item.FoodTypeId.Name} החל מ {item.ExtraPrice}
                  </div>
                ) : (
                  <div>
                    {item.Amount} {item.FoodTypeId.Name}
                  </div>
                )}

              </div>
               <hr style={{color:"rgb(142, 110, 51)"}}/>
               </>
            );
        })}
      </div>
      <Button
        variant="contained" style={{backgroundColor:"black"}}
        onClick={() =>
          navigate("/orderDateAndAmount/" + menu.Id + "/" + menu.MinimumPeople)
        }
      >
        הזמן
      </Button>
    </>
  );
}
