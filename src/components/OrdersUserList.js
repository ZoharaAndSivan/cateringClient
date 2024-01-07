import { useEffect, useState } from "react";
import { deleteOrder, getAllOrdersByUserId } from "../store/action/order";
import { shallowEqual, useSelector } from "react-redux";
import OrderUserSingle from "./OrderUserSingle";
import Swal from "sweetalert2";
import "./ScssComponets/OrderUserList.scss";

const OrderUserList = () => {
  //רשימת הזמנות
  const [ordersList, setOrdersList] = useState([]);

  const { user } = useSelector((state) => {
    return {
    //שליפת משתמש מחובר
      user: state.user.currentUser,
    };
  }, shallowEqual);

  useEffect(() => {
    //שליפת כל ההזמנות לפי אידי משתמש
    getAllOrdersByUserId(user.Id)
      .then((response) => {
        console.log(response.data);
        setOrdersList(response.data.filter(x=>x.Status.data[0]==true));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelOrder = (item) => {
    let isSuccedded = false;

    Swal.fire({
      title: "האם אתה בטוח?",
      text: "האם אתה בטוח שברצונך לבטל את ההזמנה!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, לבטל את זה!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(item.Id)
          .then((response) => {
            const arr = ordersList.filter((x) => x.Id != item.Id);
            setOrdersList([...arr]);
            isSuccedded = true;
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          title: "בוטל בהצלחה!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    return isSuccedded;
  };

  return (
    <>
    <div style={{height:"100px"}}></div>
    <div className="row p-4">
      {ordersList.length>0?
        ordersList.map((item) => (
          <div key={item.Id}>
            <OrderUserSingle item={item} cancelOrder={cancelOrder} />
          </div>
        )):<h4>עדיין אין לך הזמנות</h4>}
    </div>
    </>
  );
};

export default OrderUserList;
