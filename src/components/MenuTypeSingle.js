import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./ScssComponets/MenuTypeSingle.scss"


export default function MenuTypeSingle({ menu, deleteMenuType }) {
  const navigate = useNavigate();
  const { menuTypes, user } = useSelector((state) => {
    return {
      //סוגי תפריטים
      menuTypes: state.catering.menuTypes,
      //משתמשים
      user: state.user.currentUser,
    };
  }, shallowEqual);
  return (
    <>
      <h3 className="menuName"> {menu.Name} </h3>
      <h4 className="menuPrice"> {menu.Price}  ש"ח </h4>

      <p>לחמניות</p>
      <hr/>
      {/* סוגי מאכלים וכמויות בחירה */}
      <div>
        {menuTypes.map((item) => {
          if (item.MenuId == menu.Id)
            return (
              <div>

                {/* אם הכמות שאפשר לבחור היא 0 - זאת אומרת זה לא  קיים בתפריט */}
                {item.Amount == 0 ? (
                  <div className="foodAndAmount">
                    {item.FoodTypeId.Name} בתוספת  {item.ExtraPrice}  ש"ח {" "}
                    <br/>
                    <hr/>
                  </div >
                  // אם הסוג מאכל בתוספת מחיר 
                ) : item.ExtraPrice != 0 ? (
                  <div className="foodAndAmount">
                    {item.Amount}  סוגי {item.FoodTypeId.Name}   החל מ  {item.ExtraPrice}
                    <br/>
                    <hr/>
                  </div>
                ) : (
                  <div className="foodAndAmount">
                    {item.Amount} סוגי  {item.FoodTypeId.Name}
                    <br/>
                    <hr/>
                  </div>
                )}
              </div>
              
            );
        })}
      </div>
      
      
      <p>שתייה</p>
      <hr/>
      <p>חד"פ</p>


        {/* כפתור להזמנת תפריט */}
      <Button className="buttonOrder"
        variant="contained"
        onClick={() =>
          navigate("/orderDateAndAmount/" + menu.Id + "/" + menu.MinimumPeople)
        }
      >
        הזמן
      </Button>

<br/>
<br/>
      {/* מנהל */}
      {user?.UserType==1 && <>
      <DeleteIcon onClick={() => deleteMenuType(menu)} />
      <EditIcon  onClick={() => navigate(`/addMenuEventType/${menu.Id}/edit`)}/>
      </>}
      
    </>
  );
}
