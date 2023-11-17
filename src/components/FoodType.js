import { useEffect, useState } from "react";
import { getAllFoodByMenuId } from "../store/action/event";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function FoodType({
  menuId,
  foodTypeId,
  addFood,
  deleteFood,
  menu,
  food,
  isPossible,
}) {
  const [amount, setAmount] = useState(0);
  const [amountChosen, setAmountChosen] = useState(0);


  return (
    <div className="row">
      {food.map((item) => {
        if (item.FoodTypeId == foodTypeId)
          return (
            <div key={item.Id} className="containers">
              <h5>
                {item.Price != 0 && <span>*</span>}
                {item.Name}
              </h5>
              {item.Price != 0 && <p> בתוספת {item.Price} ש"ח</p>}
              <div>
                {menu.find((x) => x.Id == item.Id) ? (
                  <Button onClick={() => deleteFood(item)}>-</Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (isPossible(item)) addFood(item);
                      else {
                        Swal.fire({
                          title: "אופס...",
                          text: "עברת את הכמות המותרת",
                          icon: "warning",
                        });
                      }
                    }}
                  >
                    +
                  </Button>
                )}
              </div>
            </div>
          );
      })}
    </div>
  );
}
