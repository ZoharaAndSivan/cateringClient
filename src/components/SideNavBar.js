export default function SideNavBar({ menuEvent, setFoodTypeId }) {
  return (
    <>
      <div className="">
        <nav>
          <ul>
            {menuEvent.map((item) => (
              <li>
                <div
                onClick={()=> setFoodTypeId(item.FoodTypeId.Id)}
                  // to={"/foodType/" + item.MenuId + "/"+item.FoodTypeId.Id}
                >
                  {item.FoodTypeId.Name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
