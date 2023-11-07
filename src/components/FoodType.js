import { useEffect, useState } from "react";
import { getAllFoodByMenuId } from "../store/action/event";
import { Button } from "@mui/material";

export default function FoodType({
  menuId,
  foodTypeId,
  addFood,
  deleteFood,
  menu,
}) {
  const [food, setFood] = useState([]);
  useEffect(() => {
    getAllFoodByMenuId(menuId)
      .then((response) => {
        console.log(response.data);
        setFood(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="row">
      {food.map((item) => {
        if (item.FoodType == foodTypeId)
          return (
            <div key={item.Id} className="containers">
              <h5>{item.Price != 0 && <span>*</span>}{item.Name}</h5>
              {item.Price != 0 && <p> בתוספת {item.Price} ש"ח</p>}
              <div>
                {menu.find((x) => x.Id == item.Id) ? (
                  <Button onClick={() => deleteFood(item)}>-</Button>
                ) : (
                  <Button onClick={() => addFood(item)}>+</Button>
                )}
              </div>
            </div>
          );
      })}
    </div>
  );
}
