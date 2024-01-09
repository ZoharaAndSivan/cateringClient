import "./ScssComponets/SideNavBar.scss";

export default function SideNavBar({ menuEvent, setFoodTypeId }) {
  return (
    <>
      <div className="div-side-navBar">
        <nav className="nav-side-navBar">
          <ul>
            {menuEvent.map((item) => ( 
              <li className="li-foodType" style={{cursor:"pointer"}}>
                <div
                // אידי של סוג המאכל שנלחץ
                onClick={()=> setFoodTypeId(item.FoodTypeId.Id)}
                  // to={"/foodType/" + item.MenuId + "/"+item.FoodTypeId.Id}
                >
                  {/* שם סוג מאכל */}
                  <p className="foodType">{item.FoodTypeId.Name}</p>
                </div> <br/>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
