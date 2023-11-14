import { useEffect, useState } from "react";
import { getAllOrdersByUserId } from "../store/action/order";

const OrderUserList = () => {
    const [ordersList, setOrdersList] = useState();

    const { user } = useSelector((state) => {
        return {
          user: state.user.currentUser,
        };
      }, shallowEqual);

      useEffect(()=>{
        getAllOrdersByUserId(user.Id)
        .then((response) => {
          console.log(response.data);
          setOrdersList(response.data);
        })
        .catch((err) => console.log(err));
      },[])
    
    return <div className="row">
        {ordersList.map(item => <div className="containers" key={item.Id}>
               
        </div>)}
    </div>
}