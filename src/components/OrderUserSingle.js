import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const OrderUserSingle = ({ item }) => {
  const [days, setDays] = useState(0);
  useEffect(() => {
    let delta = Math.abs(item.OrderDate - new Date()) / 1000;
    setDays(Math.floor(delta / 86400));
    // delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
  }, []);

  return (
    <div>
      {days > 2 && (
        <div>
          <Button variant="contained"> בטל הזמנה </Button>
          <Button variant="contained"> עדכן הזמנה </Button>
        </div>
      )}
    </div>
  );
};
