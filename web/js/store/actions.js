export function addItem(payload) {
  return {
    type: "ADD_ITEM",
    payload
  }
}

export function removeItem(payload) {
  return {
    type: "REMOVE_ITEM",
    payload,
  }
}

export function incrementItem(payload) {
  return {
    type: "INCREMENT_ITEM",
    payload,
  }
}

export function decrementItem(payload) {
  return {
    type: "DECREMENT_ITEM",
    payload,
  }
}

export function clear() {
  return {
    type: "CLEAR",
  }
}