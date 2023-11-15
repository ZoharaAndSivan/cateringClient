import { useEffect, useState } from "react";
import { deleteOrder, getAllOrdersByUserId } from "../store/action/order";
import { shallowEqual, useSelector } from "react-redux";
import OrderUserSingle from "./OrderUserSingle";
import Swal from "sweetalert2";

const OrderUserList = () => {
  const [ordersList, setOrdersList] = useState();

  const { user } = useSelector((state) => {
    return {
      user: state.user.currentUser,
    };
  }, shallowEqual);

  useEffect(() => {
    getAllOrdersByUserId(user.Id)
      .then((response) => {
        console.log(response.data);
        setOrdersList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelOrder = (item) => {
    let isSuccedded = false;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(item.Id)
          .then((response) => {
            const arr = ordersList.filter((x) => x.Id == item.Id);
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
    <div className="row p-4">
      {ordersList &&
        ordersList.map((item) => (
          <div key={item.Id}>
            <OrderUserSingle item={item} cancelOrder={cancelOrder} />
          </div>
        ))}
    </div>
  );
};

export default OrderUserList;
