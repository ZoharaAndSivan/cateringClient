import * as types from "../actionTypes";

//פונקצייה שמחזירה את סוג הפעולה ואת האובייקט 
export const saveUser = (user) => {
    return {
        type: types.SAVE_USER,
        payload: user
    }
}
//פונקציית יציאת משתמש
export const logOut = () => {
    return {
        type: types.LOG_OUT
    }
}

//פונקציית יציאת משתמש
export const addUser = (user) => {
    return {
        type:types.ADD_USER,
        payload: user
    }
}

