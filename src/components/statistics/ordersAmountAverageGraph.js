import React, { useEffect, useState } from "react";
import CanvasJSReact from "./canvasjs.react";
import { getAmountOrdersStatictics, } from "../../service/order";
import ReportExportButton from "./excelReport";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function OrdersAmountAverage() {
  const [orders, setOrders] = useState([]);
  const [arrExcel, setarrExcel] = useState([]);
  useEffect(() => {
    getAmountOrdersStatictics()
      .then((x) => {
        setOrders(x.data);
        let newArr = x.data.map(obj => ({
          Month: obj.label,
          AmountOrders: obj.y,
        }));
      setarrExcel(newArr)
      })
      .catch((err) => console.log(err));
  }, []);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: orders,
      },
    ],
  };

  return (
    <div id="chart" style={{ marginTop: "90px" }}>
      <div className="row gx-0 justify-content-between mb-2">
        <h4 className="m-2 col-4 fw-bold"> גרף ממוצע הזמנות לחודש</h4>
        <div className="col-2">
          <ReportExportButton arr={arrExcel} />
        </div>
      </div>
      <div className="px-5 center">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}
