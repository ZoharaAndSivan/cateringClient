import * as types from "../actionTypes";

//סטייט כללי
const initialState = {
  //משתמשים
  eventsTypes: [
    { id: 1, Name: "קייטרינג" },
    { id: 2, Name: "בר מצווה" },
    { id: 3, Name: "בת מצווה" },
  ],
  menusEvents: [
    { id: 1, EventId: 1, Name: "בסיסי", Minimum: 30, Price: 59 },
    { id: 2, EventId: 2, Name: "בסיסי", Minimum: 30, Price: 59 },
    { id: 3, EventId: 3, Name: "בסיסי", Minimum: 30, Price: 59 },
  ],
  menuTypes: [
    {
      id: 1,
      MenuId: 1,
      FoodTypeId: { id: 1, Name: "סלטים" },
      Amount: 30,
      ExtraPrice: 40, //???
      ExtraType: 20,
    },
    {
      id: 2,
      MenuId: 1,
      FoodTypeId: { id: 3, Name: "מנה אחרונה" },
      Amount: 30,
      ExtraPrice: 40,
      ExtraType: 20,
    },
    {
      id: 3,
      MenuId: 1,
      FoodTypeId: { id: 2, Name: "מנה ראשונה" },
      Amount: 30,
      ExtraPrice: 40,
      ExtraType: 20,
    },
  ],

  foodTypes: [
    { id: 1, Name: "סלטים" },
    { id: 2, Name: "מנה ראשונה" },
    { id: 3, Name: "דגים" },
    { id: 4, Name: "בשרי" },
  ],
  food: [
    { id: 1, Name: "סלמון", Price: 5, IsActive: true, FoodTypeId: 3 },
    { id: 2, Name: "דג", Price: 0, IsActive: true, FoodTypeId: 3 },
    { id: 3, Name: "לחם", Price: 0, IsActive: true, FoodTypeId: 2 },
    { id: 4, Name: "כרוב", Price: 0, IsActive: true, FoodTypeId: 1 },
  ],
  events: [{ id: 1, eventTypesId: 3 }],
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
  }
  return state;
};

export default cateringReducer;

//סוגי מאכלים
//
