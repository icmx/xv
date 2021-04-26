export class Emitter {
  #listeners;

  constructor(types) {
    this.#listeners = Object.create(null);
  }

  on(type, listener) {
    this.#listeners[type] = this.#listeners[type]
      ? [...this.#listeners[type], listener]
      : [listener];
  }

  emit(type, ...payload) {
    this.#listeners[type].forEach((listener) => {
      listener(...payload);
    });
  }
}
