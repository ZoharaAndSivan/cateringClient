import axios from "axios";
import * as types from "../actionTypes";

//פונקצייה שמחזירה את סוג הפעולה ואת האובייקט 
export const saveEvents = (events)=>{
    return {
        type: types.SAVE_EVENTS,
        payload: events
    }
}

//מחיקת משימה
export const deleteTask = (id)=>{
    return {
        type: types.DELETE_TASK,
        payload: id
    }
}

export const getAllFoodByMenuId = (menuId)=>{
    return axios.get(`http://localhost:8080/productToMenuRouter/getAllFoodByMenuId/${menuId}`)
}