import { useSelector } from "react-redux";
//מציג את סוגי המאכלים ואת שמות המאכלים לכל סוג
export default function SubMenu({ typeMenu, change }) {
  //שולפת מאכלים
  const food = useSelector((state) => state.catering.food);

  return (
    <div>
      <h2>
        {" "}
        {/*מציג את סוג המאכל וכמות הסוגים שאפשר לבחור */}
        {typeMenu.FoodTypeId.Name} ({typeMenu.Amount} לבחירה) בתוספת{" "}
        {typeMenu.Supplement} ש"ח{" "}
      </h2>
      {food.map((item, index) => {
        if (item.IsActive && item.FoodTypeId == typeMenu.FoodTypeId.id)
          return (
            <div key={item.Id}>
              <label> {item.Name} </label>
              <input type="checkbox" onChange={(e) => change(e, item)} />
            </div>
          );
      })}
    </div>
  );
}
