export class Jeox {
  #elements;

  constructor(elements = []) {
    if (elements.length === 0) {
      throw new Error(`Jeox instance must include at least one node`);
    }

    this.#elements = [...elements];
  }

  forEach(callback) {
    this.#elements.forEach(callback);

    return this;
  }

  map(callback) {
    return this.#elements.map(callback);
  }

  get size() {
    return this.#elements.length;
  }

  nth(n) {
    return new Jeox([this.#elements[n]]);
  }

  first() {
    return this.nth(0);
  }

  last() {
    return this.nth(this.size - 1);
  }

  odd() {
    const items = [];

    for (let i = 0; i < this.size; i += 2) {
      items.push(this.#elements[i]);
    }

    return new Jeox(items);
  }

  even() {
    const items = [];

    for (let i = 1; i < this.size; i += 2) {
      items.push(this.#elements[i]);
    }

    return new Jeox(items);
  }

  child(i = 0) {
    return this.#elements[i];
  }

  children() {
    return this.#elements;
  }
}
