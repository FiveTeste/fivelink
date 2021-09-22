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
    case "REMOVE_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      newItems.splice(index, 1);
      
      return { items: [...newItems] }
    }
    case "INCREMENT_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      const currentItem = {...newItems[index]};

      const newQuantity = currentItem.quantity + 1;
      const totalPrice = currentItem.unitPrice * newQuantity;

      const currentDate = new Date();
      const str = `${currentDate.toLocaleString()}${totalPrice}${newQuantity}${window.nummesa}`;
      const hash = CryptoJS.MD5(str).toString().toUpperCase();

      const newItem = { ...currentItem, quantity: newQuantity, totalPrice, hash };
      newItems.splice(index, 1, newItem);

      return { items: [...newItems] }
    }
    case "DECREMENT_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      const currentItem = {...newItems[index]};

      const newQuantity = currentItem.quantity - 1;

      if (newQuantity <= 0) return state;

      const totalPrice = currentItem.unitPrice * newQuantity;
      const currentDate = new Date();
      const str = `${currentDate.toLocaleString()}${totalPrice}${newQuantity}${window.nummesa}`;
      const hash = CryptoJS.MD5(str).toString().toUpperCase();

      const newItem = { ...currentItem, quantity: newQuantity, totalPrice, hash };
      newItems.splice(index, 1, newItem);

      return { items: [...newItems] }
    }
    case "CLEAR": {
      return { items: [] }
    }

    default:
      return state;
  }
});