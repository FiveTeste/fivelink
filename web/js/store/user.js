import { Store } from "../utils/store.js";
import { masks } from "../utils/masks.js";

const INITIAL_STATE = {
  user: undefined,
  address: undefined,
}

export const userStore = new Store((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PHONE": {
      const phone = action.payload;
      const currentUser = state.user ? state.user : {};

      if (!phone) {
        return { ...state, user: { ...currentUser, telefone: phone } }
      }

      const maskedPhone = masks.phone(phone);
      return { ...state, user: { ...currentUser, telefone: maskedPhone } }
    }
    case "SET_USER": {
      const user = action.payload ? action.payload : {};

      const phone = user.telefone;
      if (!phone) {
        return { ...state, user };
      }

      const maskedPhone = masks.phone(phone);
      const newUser = { ...user, telefone: maskedPhone };
      return { ...state, user: newUser };
    }
    case "SET_ADDRESS": {
      const address = action.payload;
      return { ...state, address }
    }
    case "CLEAR": {
      return INITIAL_STATE
    }
    default: 
      return state;
  }
});