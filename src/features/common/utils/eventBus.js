export default class EventBus {
    constructor() {
        this.events = {};
    }

    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn) => fn(data));
        }
    }

    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }

    off(eventName, fn) {
        if (this.events[eventName]) {
            const spliceIdx = this.events[eventName].findIndex(i => i === fn)
            if (spliceIdx >= -1) this.events[eventName].splice(spliceIdx, 1);
        }
    }
}

export const eventBus = (eventName) => {
    const eb = new EventBus()
    return {
        emit: (data) => eb.emit(eventName, data),
        on: (fn) => eb.on(eventName, fn),
        off: (fn) => eb.off(eventName, fn)
    }
}