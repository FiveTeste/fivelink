import { Store } from "../utils/store.js";

const INITIAL_STATE = {
  quantity: 1
};

export const orderStore = new Store((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PONTO_CARNE": {
      return { ...state, ponto_carne: action.payload }
    }
    case "SET_OBSERVATION": {
      return { ...state, observation: action.payload }
    }
    case "SET_QUANTITY": {
      return { ...state, quantity: action.payload }
    }
    case "SET_PRODUCTS": {
      return { ...state, products: action.payload }
    }
    case "SET_ADDITIONAL": {
      return { ...state, additional: action.payload }
    }
    case "SET_OPTIONAL": {
      return { ...state, optional: action.payload }
    }
    case "SET_OPCOES": {
      return { ...state, opcoes: action.payload }
    }
    case "CLEAR_ORDER": {
      return { ...INITIAL_STATE }
    }
    default: {
      return { ...INITIAL_STATE }
    }
  }
});