import * as types from "../actionTypes";

const initialState = {
    editOrder: null,
 
}
const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SAVE_EDIT_ORDER:
            return {
                ...state,
                editOrder: action.payload
            }
    }
    return state;

}
export default orderReducer;