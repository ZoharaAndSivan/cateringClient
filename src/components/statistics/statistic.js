import React from "react";
import IncomesGraph from "./incomesGraph";
import Pie from "./pie";
import OrdersAmountAverage from "./ordersAmountAverageGraph";

const Statistic = () => {
  return (
    <div className="my-5 py-4 p-5">
      <div className="p-5">
        <h2 className="text-center" style={{ color: "#245160" }}>
          דוחות וניתוחים סטטיסטים בפריסה שנתית
        </h2>
        <div className="mb-2 text-center mx-auto d-block text-center">
          <hr className="staticts" />
        </div>
        {/* <MyChart /> */}
        <IncomesGraph />
        <OrdersAmountAverage />
        <Pie />
      </div>
    </div>
  );
};

export default Statistic;
