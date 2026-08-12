export class Emitter {
  listeners;

  constructor() {
    this.listeners = Object.create(null);
  }

  on(type, listener) {
    this.listeners[type] = this.listeners[type]
      ? [...this.listeners[type], listener]
      : [listener];
  }

  emit(type, ...payload) {
    const listeners = this.listeners[type] ?? [];

    listeners.forEach((listener) => {
      listener(...payload);
    });
  }
}
