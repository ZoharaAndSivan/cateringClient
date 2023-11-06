import * as types from "../actionTypes";

//סטייט כללי
const initialState = {
  //משתמשים
  eventsTypes: [
    { Id: 1, Name: "קייטרינג" },
    { Id: 2, Name: "בר מצווה" },
    { Id: 3, Name: "בת מצווה" },
  ],
  menusEvents: [
    { Id: 1, EventId: 1, Name: "בסיסי", Minimum: 30, Price: 59 },
    { Id: 2, EventId: 2, Name: "בסיסי", Minimum: 30, Price: 59 },
    { Id: 3, EventId: 3, Name: "בסיסי", Minimum: 30, Price: 59 },
  ],
  menuTypes: [
    {
      Id: 1,
      MenuId: 1,
      FoodTypeId: { Id: 1, Name: "סלטים" },
      Amount: 30,
      ExtraPrice: 40, //???
      ExtraType: 20,
    },
    {
      Id: 2,
      MenuId: 1,
      FoodTypeId: { Id: 3, Name: "מנה אחרונה" },
      Amount: 30,
      ExtraPrice: 40,
      ExtraType: 20,
    },
    {
      Id: 3,
      MenuId: 1,
      FoodTypeId: { Id: 2, Name: "מנה ראשונה" },
      Amount: 30,
      ExtraPrice: 40,
      ExtraType: 20,
    },
  ],

  foodTypes: [
    { Id: 1, Name: "סלטים" },
    { Id: 2, Name: "מנה ראשונה" },
    { Id: 3, Name: "דגים" },
    { Id: 4, Name: "בשרי" },
  ],
  food: [
    { Id: 1, Name: "סלמון", Price: 5, IsActive: true, FoodTypeId: 3 },
    { Id: 2, Name: "דג", Price: 0, IsActive: true, FoodTypeId: 3 },
    { Id: 3, Name: "לחם", Price: 0, IsActive: true, FoodTypeId: 2 },
    { Id: 4, Name: "כרוב", Price: 0, IsActive: true, FoodTypeId: 1 },
  ],
  events: [{ Id: 1, eventTypesId: 3 }],
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
