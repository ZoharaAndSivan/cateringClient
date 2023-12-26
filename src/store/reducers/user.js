import * as types from "../actionTypes";

const initialState = {
    currentUser: {Id:4, FirstName:"Tehila", LastName:"Elkarif", UserType:3},
    users:[
        {id:1,firstName:"michal",lastName:"cohen",fhone:"0533177645",adress:"שדרות ירושלים 15",email:"michal@gmail.com",password:"1254"},
        {id:2,firstName:"hodaya",lastName:"levi",fhone:"0524875147",adress:"ויצמן 67",email:"hodaya@gmail.com",password:"48754"},
        {id:3,firstName:"shilat",lastName:"naim",fhone:"0523147845",adress:"זבוטינסקי 25",email:"shilt@gmail.com",password:"210487"}
        
    ],

    contactUs:[{Id:1, FullName:"michal", Phone:"0523451254", Note:"jhgfcghgh", Perform:false, Email:"michal@gmail.com", ManegerNote:null},
               {Id:2, FullName:"shira", Phone:"0526587458", Note:"ybfvtcdx", Perform:false, Email:"shira@gmail.com", ManegerNote:null}
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