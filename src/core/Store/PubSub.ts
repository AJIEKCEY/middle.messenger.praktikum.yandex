import EventBus from "../EventBus.ts";

export default class PubSub extends EventBus {
  emit(event: string, ...args: unknown[]): void {
    const listeners = this._listeners[event];
    if (!listeners) return;

    listeners.forEach((listener) => listener(...args));
  }
}
