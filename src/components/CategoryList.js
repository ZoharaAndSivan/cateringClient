import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const CategoryList = ({ category, menu, deleteFood }) => {
    const [isMore, setIsMore] = useState(true);
  return (
    <>
      <div>
        {category.FoodTypeId.Name} ({category.AmountChosen}/{category.Amount})
        <span onClick={() => setIsMore(!isMore)}>
          {isMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </span>
      </div>
      {menu.length > 0 && isMore &&
        menu.map((itemMenu) => {
          if (itemMenu.FoodTypeId == category.FoodTypeId.Id)
            return <div key={itemMenu.Id}>{itemMenu.Name}  <span onClick={()=>deleteFood(itemMenu)}><RemoveCircleOutlineRoundedIcon/></span></div>;
        })}

    </>
  );
};
export default CategoryList;
