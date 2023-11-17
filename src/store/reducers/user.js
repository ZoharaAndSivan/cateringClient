import * as types from "../actionTypes";

const initialState = {
    currentUser: {Id:2, FirstName:"Ahuva", LastName:"Elkarif"},
    users:[
        {id:1,firstName:"michal",lastName:"cohen",fhone:"0533177645",address:"שדרות ירושלים 15",email:"michal@gmail.com",password:"1254"},
        {id:2,firstName:"hodaya",lastName:"levi",fhone:"0524875147",address:"ויצמן 67",email:"hodaya@gmail.com",password:"48754"},
        {id:3,firstName:"shilat",lastName:"naim",fhone:"0523147845",address:"זבוטינסקי 25",email:"shilt@gmail.com",password:"210487"}
        
    ]
}
const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SAVE_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case types.LOG_OUT:
            return {
                ...state,
                currentUser: null
            }
            case types.ADD_USER:
                return {
                    ...state,
                    currentUser: action.payload
                }

    }
    return state;

}
export default userReducer;