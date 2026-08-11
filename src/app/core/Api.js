export class Api {
  baseUrl;

  #controller;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    this.setupRequest();
  }

  get signal() {
    return this.#controller.signal;
  }

  setupRequest() {
    this.#controller = new AbortController();
  }

  abortRequest() {
    this.#controller.abort();
  }

  async get(path) {
    this.setupRequest();

    const response = await fetch(`${this.baseUrl}/${path}`, {
      method: 'GET',
      signal: this.#controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  }
}
