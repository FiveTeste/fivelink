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

    default:
      return state;
  }
});