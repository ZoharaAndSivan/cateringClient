import { useEffect, useState } from "react";
import { getAllFoodByMenuId } from "../store/action/event";
import { Button, Card, CardMedia } from "@mui/material";
import Swal from "sweetalert2";
import "./ScssComponets/FoodType.scss";

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

useEffect(()=>{},[food])
  return (
    <>

    <div className="row">

      {food.map((item) => {
        // מאכלים לפי סוגים
        if (item.FoodTypeId == foodTypeId)
          return (
            <div key={item.Id} className="containers">

              {/* תמונה */}

              {/* {item.Image} */} 
              {/* {/* {console.log(item.Image)}; */}
              {/* <img src={`../../images/eventImages/azkara.JPG`}/> */}
              {/* <img src="/images/salatim/xxx.jpg" /> */}
              <img src={`/images/salatim/${item.Image}`} />
              {/* <img src={`../../public/images/salatim/${item.Image}`}/>  */}

              <h5>
                {/* מחיר בתוספת */}
                {item.Price != 0 && <span>*</span>}
                {item.Name}
              </h5>

              {item.Price != 0 && <p> בתוספת {item.Price} ש"ח</p>}

              <div>
                {menu.find((x) => x.Id == item.Id) ? (
                  <Button  onClick={() => deleteFood(item)}>
                   <p className="buttomChoose">-</p> 
                  </Button>
                ) : (
                  <Button className="buttomChoose"
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
                    <p className="buttomChoose">+</p> 
                  </Button>
                )}
              </div>
              
            </div>
          );
      })}
    </div>
    </>
  );
}
