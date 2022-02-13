import { Store } from "../utils/store.js";

import { calcAdditionalPrice } from "../utils/calcs.js";

const INITIAL_STATE = {
  items: [],
  cupom: undefined,
  shipping: undefined,
  retirarLocal: false,
  payment: undefined,
  troco: undefined,
  recibo: false,
  infoRecibo: undefined,
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
      
      return { ...state, items: [...newItems] }
    }
    case "INCREMENT_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      const currentItem = {...newItems[index]};

      const newQuantity = currentItem.quantity + 1;
      const totalPrice = currentItem.unitPrice * newQuantity;

      const additionalPrice = calcAdditionalPrice(currentItem.additional);
      const finalPrice = parseFloat(totalPrice) + parseFloat(additionalPrice);

      const currentDate = new Date();
      const str = `${currentDate.toLocaleString()}${finalPrice}${newQuantity}${window.nummesa}`;
      const hash = CryptoJS.MD5(str).toString().toUpperCase();

      const newItem = { ...currentItem, quantity: newQuantity, totalPrice: finalPrice, hash };
      newItems.splice(index, 1, newItem);

      return { ...state, items: [...newItems] }
    }
    case "DECREMENT_ITEM": {
      const { index } = action.payload;
      const newItems = [...state.items];
      const currentItem = {...newItems[index]};

      const newQuantity = currentItem.quantity - 1;

      if (newQuantity <= 0) return state;

      const totalPrice = currentItem.unitPrice * newQuantity;
      const additionalPrice = calcAdditionalPrice(currentItem.additional);
      const finalPrice = parseFloat(totalPrice) + parseFloat(additionalPrice);

      const currentDate = new Date();
      const str = `${currentDate.toLocaleString()}${finalPrice}${newQuantity}${window.nummesa}`;
      const hash = CryptoJS.MD5(str).toString().toUpperCase();

      const newItem = { ...currentItem, quantity: newQuantity, totalPrice: finalPrice, hash };
      newItems.splice(index, 1, newItem);

      return { ...state, items: [...newItems] }
    }
    case "ADD_CUPOM": {
      return { ...state, cupom: action.payload }
    }
    case "REMOVE_CUPOM": {
      return { ...state, cupom: undefined }
    }
    case "SET_SHIPPING": {
      return { ...state, shipping: action.payload, retirarLocal: false }
    }
    case "SET_RETIRAR_LOCAL": {
      return { ...state, shipping: undefined, retirarLocal: true }
    }
    case "SET_PAYMENT": {
      return { ...state, payment: action.payload }
    }
    case "SET_TROCO": {
      return { ...state, troco: action.payload }
    }
    case "SET_RECIBO": {
      return { ...state, recibo: action.payload }
    }
    case "SET_INFO_RECIBO": {
      return { ...state, infoRecibo: action.payload }
    }

    case "CLEAR": {
      return { items: [] }
    }

    default:
      return state;
  }
});