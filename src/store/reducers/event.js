import * as types from "../actionTypes";

//סטייט כללי
const initialState = {
  //משתמשים
  eventsTypes: [],
  menusEvents: [],
  menuTypes: [],

  // foodTypes: [
  //   { Id: 1, Name: "סלטים" },
  //   { Id: 2, Name: "מנה ראשונה" },
  //   { Id: 3, Name: "דגים" },
  //   { Id: 4, Name: "בשרי" },
  // ],
  // food: [
  //   { Id: 1, Name: "סלמון", Price: 5, IsActive: true, FoodTypeId: 3 },
  //   { Id: 2, Name: "דג", Price: 0, IsActive: true, FoodTypeId: 3 },
  //   { Id: 3, Name: "לחם", Price: 0, IsActive: true, FoodTypeId: 2 },   
  //   { Id: 4, Name: "כרוב", Price: 0, IsActive: true, FoodTypeId: 1 },
  // ],
  //אירוע נבחר  
  currentEvent: null,
};

//פעולת הוספת משתמש
const cateringReducer = (state = initialState, action) => {
  //בחירת אירוע נוכחי
  switch (action.type) {
    case types.SAVE_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case types.SAVE_ALL_MENU_TYPES:
      return {
        ...state,
        menuTypes: action.payload,
      };
    case types.SAVE_ALL_EVENTS_TYPE:
      return {
        ...state,
        eventsTypes: action.payload,
      };
    case types.SAVE_ALL_MENU_EVENTS:
      return {
        ...state,
        menusEvents: action.payload,
      };
    case types.UPDATE_EVENTS_TYPE:
      return {
        ...state,
        eventsTypes: action.payload,
      };
  }
  return state;
};

export default cateringReducer;

//סוגי מאכלים
//
