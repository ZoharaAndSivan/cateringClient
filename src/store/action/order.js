import axios from "axios";
import * as types from "../actionTypes";


export const getAllOrdersByUserId = (id)=>{
    return axios.get(`http://localhost:8080/orderRouter/getAllOrdersByUserId/${id}`)
}

export const deleteOrder = (id)=>{
    return axios.put(`http://localhost:8080/orderRouter/deleteOrder/${id}`)
}