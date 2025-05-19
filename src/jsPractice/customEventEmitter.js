// eslint-disable-next-line no-unused-vars
class customEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listernerFn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    let isExistingListerner = this.events[eventName].findIndex(
      (item) => item == listernerFn
    );
    if (isExistingListerner == -1) {
      this.events[eventName].push(listernerFn);
    }
    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return "Event not found";
    }
    this.events[eventName].forEach((listernerFn) => listernerFn(...args));
  }

  off(eventName, listernerFn) {
    if (!this.events[eventName]) {
      return "Event not found";
    }
    this.events[eventName] = this.events[eventName].filter(
      (item) => item == listernerFn
    );
  }
}
