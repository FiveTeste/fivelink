export function setPhone(payload) {
  return {
    type: "SET_PHONE",
    payload,
  }
}

export function setUser(payload) {
  return {
    type: "SET_USER",
    payload,
  }
}

export function setAddress(payload) {
  return {
    type: "SET_ADDRESS",
    payload,
  }
}

export function clear() {
  return {
    type: "CLEAR",
  }
}
