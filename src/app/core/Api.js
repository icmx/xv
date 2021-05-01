export class Api {
  #endpoint;
  #controller;

  constructor(endpoint) {
    this.#endpoint = endpoint;

    this.refresh();
  }

  get endpoint() {
    return this.#endpoint;
  }

  get signal() {
    return this.#controller.signal;
  }

  abort() {
    this.#controller.abort();
  }

  refresh() {
    this.#controller = new AbortController();
  }
}
