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


export function setPontoCarne(payload) {
  return {
    type: "SET_PONTO_CARNE",
    payload
  }
}

export function setCopos(payload) {
  return {
    type: "SET_COPOS",
    payload,
  }
}

export function setTalheres(payload) {
  return {
    type: "SET_TALHERES",
    payload,
  }
}

export function setObservation(payload) {
  return {
    type: "SET_OBSERVATION",
    payload,
  }
}

export function setQuantity(payload) {
  return {
    type: "SET_QUANTITY",
    payload,
  }
}

export function setProducts(payload) {
  return {
    type: "SET_PRODUCTS",
    payload,
  }
}

export function setAdditional(payload) {
  return {
    type: "SET_ADDITIONAL",
    payload,
  }
}

export function setOptional(payload) {
  return {
    type: "SET_OPTIONAL",
    payload,
  }
}

export function setOpcoes(payload) {
  return {
    type: "SET_OPCOES",
    payload,
  }
}

export function clearOrder() {
  return {
    type: "CLEAR_ORDER",
  }
}