export class Api {
  #endpoint;

  constructor(endpoint) {
    this.#endpoint = endpoint;
  }

  get endpoint() {
    return this.#endpoint;
  }
}
