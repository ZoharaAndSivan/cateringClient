import axios from "axios"

export const getFoodsOrder = (orderId) => {
    return axios.get("http://localhost:8080/foodsOrdersRouter/getFoodsOrderByOrderId/"+orderId)
}

export const addOrder = (details) => {
    return axios.post("http://localhost:8080/orderRouter/addOrder",details)
}

export const deleteOrder = (id) => {
    return axios.post("http://localhost:8080/orderRouter/addOrder"+ id)
}