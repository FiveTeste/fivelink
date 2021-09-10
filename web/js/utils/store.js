class Store {


  constructor(reducer, _self = this) {
    if (!reducer || typeof reducer !== 'function') {
      throw new Error("invalid reducer");
    }

    this.stored = {
      state: undefined,
    };
    this.subscribers = [];


    const handler = {
      set(target, property, value) {
        const newValue = Reflect.set(target, property, value);
        _self.subscribers.forEach((item) => item(target.state));
        return newValue;
      },
      deleteProperty(target, property) {
        const newValue = Reflect.deleteProperty(target, property);
        _self.subscribers.forEach((item) => item(target.state));
        return newValue;
      }
    }

    const defaultValue = {
      state: undefined
    }
    
    this.reducer = reducer;
    this.stored = new Proxy(defaultValue, handler);
    this.stored.state = this.reducer(undefined, {});
  }

  addListener(callback) {
    this.subscribers.push(callback);
  }
  removeListener(callback) {
    this.subscribers = this.subscribers.filter((item) => item !== callback);
  }

  dispatchAction(action) {
    this.stored.state = this.reducer(this.state, action);
  }

  get state() {
    return getState(this, (state) => state);
  }
}

function getState(store, callback) {
  return callback(store.stored.state);
}

export {
  Store,
  getState
}