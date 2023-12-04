import { Button } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MenuTypeSingle({ menu, deleteMenuType }) {
  const navigate = useNavigate();
  const { menuTypes, user } = useSelector((state) => {
    return {
      menuTypes: state.catering.menuTypes,
      user: state.user.currentUser,
    };
  }, shallowEqual);
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
                  <div>
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
            );
        })}
      </div>

      <Button
        variant="contained"
        onClick={() =>
          navigate("/orderDateAndAmount/" + menu.Id + "/" + menu.MinimumPeople)
        }
      >
        הזמן
      </Button>
      {user.UserType==1 && <DeleteIcon onClick={() => deleteMenuType(menu)} />}
    </>
  );
}
