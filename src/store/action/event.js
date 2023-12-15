import axios from "axios";
import * as types from "../actionTypes";

//פונקצייה שמחזירה את סוג הפעולה ואת האובייקט 
export const saveEvents = (events)=>{
    return {
        type: types.SAVE_EVENTS,
        payload: events
    }
}

export const saveMenuTypes = (data)=>{
    return {
        type: types.SAVE_ALL_MENU_TYPES,
        payload: data
    }
}

export const saveEventsType = (data)=>{
    return {
        type: types.SAVE_ALL_EVENTS_TYPE,
        payload: data
    }
}

export const saveMenuEvents = (data)=>{
    return {
        type: types.SAVE_ALL_MENU_EVENTS,
        payload: data
    }
}

export const updateEventsType = (data)=>{
    return {
        type: types.UPDATE_EVENTS_TYPE,
        payload: data
    }
}

export const getAllFoodByMenuId = (id)=>{
    return axios.get(`http://localhost:8080/productToMenuRouter/getAllFoodByMenuId/${id}` );
}