import axios from "axios"

export const getFoodsOrder = (orderId) => {
    return axios.get("http://localhost:8080/foodsOrdersRouter/getFoodsOrderByOrderId/"+orderId)
}

export const addOrder = (details) => {
    return axios.post("http://localhost:8080/orderRouter/addOrder",details)
}

export const deleteOrder = (id) => {
    return axios.put("http://localhost:8080/orderRouter/deleteOrder/"+ id)
}

export const getAllOrders = () => {
    return axios.get("http://localhost:8080/orderRouter/getAllOrder");
}

export const getPopularEvents = () => {
    return axios.get("http://localhost:8080/orderRouter/getPopularEvents");
}

export const getIncomesByMonths = () => {
    return axios.get("http://localhost:8080/orderRouter/getIncomesByMonths");
}

export const getAmountOrdersStatictics = () => {
    return axios.get("http://localhost:8080/orderRouter/getAmountOrdersStatictics");
}
export const changeIsClose = (id) => {
    return axios.put("http://localhost:8080/orderRouter/UpdateIsClose/"+id);
}