import { useEffect, useState } from "react";
import { getAllFoodByMenuId } from "../store/action/event";
import { Button } from "@mui/material";

export default function FoodType({menuId, foodTypeId, addFood, deleteFood}) {
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
              <h5>{item.Name}</h5>
              <div>
                <Button onClick={()=>addFood(item)}>
                  +
                </Button>
                <Button onClick={()=>deleteFood(item)}>
                  -
                </Button>
              </div>
            </div>
          );
      })}
    </div>
  );
}
