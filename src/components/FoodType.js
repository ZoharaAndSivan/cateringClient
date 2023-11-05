import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllFoodByMenuId } from "../store/action/event";

export default function FoodType() {
  const { id, menuId } = useParams();
  const [food, setFood] = useState([]);
  useEffect(() => {
    getAllFoodByMenuId(menuId)
      .then((response) => {
        console.log(response.data);
        setFood(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <>
  
  </>;
}
