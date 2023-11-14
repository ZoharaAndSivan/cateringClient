import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MenuTypeSingle({ menu }) {
  const navigate = useNavigate();
  const menuTypes = useSelector((state) => state.catering.menuTypes);
  return (
    <>
      <h3> {menu.Name} </h3>
      <h4> {menu.Price} </h4>
      <div>
        {menuTypes.map((item) => {
          if (item.MenuId == menu.Id)
            return (
              <div>
                {item.Amount == 0 ? (
                  <div> {item.FoodTypeId.Name} בתוספת {item.ExtraPrice} ש"ח </div>
                ) : (
                  <div>
                    {item.Amount} {item.FoodTypeId.Name} 
                  </div>
                )}
              </div>
            );
        })}
      </div>
      <Button variant="contained" onClick={() => navigate("/orderDateAndAmount/" + menu.Id+"/"+menu.MinimumPeople)}>
        הזמן
      </Button>
    </>
  );
}
