import { useEffect, useState } from "react";

import "./ScssComponets/DisplayOrderProducts.scss";
const DisplayOrderProducts = ({ order, food }) => {
  const [groupedMenu, setGroupedMenu] = useState([]);

  useEffect(() => {
    const arr = Object.entries(
      order.Products.reduce(
        (acc, { Id, FoodTypeId, TypeName, Active, Name, Price }) => {
          if (!acc[FoodTypeId]) {
            acc[FoodTypeId] = [];
          }
          acc[FoodTypeId].push({
            Id,
            Active,
            TypeName,
            Name,
            Price,
            FoodTypeId,
          });

          return acc;
        },
        {}
      )
    ).map(([type, options]) => ({ type, options }));
    setGroupedMenu(arr);
  }, []);
  console.log(order, food);
  console.log(groupedMenu)
  return (
    <div className="p-2 mt-4">
      <h3> התפריט הקודם שהוזמן: </h3>
      {groupedMenu.length > 0 &&
        groupedMenu.map((item) => (
          <ul>
            <span className="ps-2">{item.options[0].TypeName} :</span>
            {item.options.map((product) => (
              <p
                className="ms-3"
                style={{
                  color: food.find((x) =>
                    x.FoodId == product.Id) ? "brown" : "red"
                  
                }}
              >
                {/* 💮 {product.Name}. */}
                 {product.Name}.
              </p>
            ))}
          </ul>
        ))}
        <p> *.צבע חום- מאכלים שקיימים בתפריט הנ"ל.  צבע אדום - מאכלים שאינם קיימים בתפריט הנ"ל </p>
    </div>
  );
};

export default DisplayOrderProducts;
