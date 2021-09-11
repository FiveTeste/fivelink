import { Store } from "../utils/store.js";

const INITIAL_STATE = {
  items: []
}

export const appStore = new Store((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems = [...state.items];
      return { items: [...newItems, action.payload ] }
    }
    case "DELETE_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      newItems.splice(index, 1);
      
      return { items: [...newItems] }
    }

    default:
      return state;
  }
});