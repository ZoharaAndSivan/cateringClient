import { Link } from "react-router-dom";

export default function SideNavBar({ menuEvent }) {
  return (
    <>
      <div className="">
        <nav>
          <ul>
            {menuEvent.map((item) => (
              <li>
                <Link
                  to={"/foodType/" + item.FoodTypeId.id + "/" + item.MenuId}
                >
                  {item.FoodTypeId.Name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
