import React from "react";
import CanvasJSReact from "./canvasjs.react";
import { useState } from "react";
import { useEffect } from "react";
import ReportExportButton from "./excelReport";
import { getPopularEvents } from "../../service/order";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Pie = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    getPopularEvents()
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const options = {
    backgroundColor: "#f7f7f8",
    animationEnabled: true,
    exportFileName: "אירועים פופולארים",
    // exportEnabled: true,
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{y}%",
        indexLabelPlacement: "inside",
        dataPoints: statistics,
      },
    ],
  };

  return (
    <div className="my-5">
      <div className="row gx-0 justify-content-between mb-2">
        <h4 className="mb-3 col-4 fw-bold">אירועים פופולארים</h4>
      </div>

      {statistics.length > 0 ? (
        <CanvasJSChart options={options} />
      ) : (
        <p>אין נתונים במערכת.</p>
      )}
    </div>
  );
};
export default Pie;
