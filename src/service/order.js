import axios from "axios"

export const getFoodsOrder = (orderId) => {
    return axios.get("http://localhost:8080/foodsOrdersRouter/getFoodsOrderByOrderId/"+orderId)
}