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

export function addCupom(payload) {
  return {
    type: "ADD_CUPOM",
    payload,
  }
}

export function removeCupom(payload) {
  return {
    type: "REMOVE_CUPOM",
    payload,
  }
}

export function setShipping(payload) {
  return {
    type: "SET_SHIPPING",
    payload,
  }
}

export function setRetirarLocal(payload) {
  return {
    type: "SET_RETIRAR_LOCAL",
    payload,
  }
}

export function setPayment(payload) {
  return {
    type: "SET_PAYMENT",
    payload,
  }
}

export function setTroco(payload) {
  return {
    type: "SET_TROCO",
    payload,
  }
}

export function setRecibo(payload) {
  return {
    type: "SET_RECIBO",
    payload,
  }
}

export function setInfoRecibo(payload) {
  return {
    type: "SET_INFO_RECIBO",
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

export function setCombos(payload) {
  return {
    type: "SET_COMBOS",
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

export function countOrder() {
  return {
    type: "COUNT",
  }
}