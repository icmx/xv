import { isEmptyArray } from '#/lib/common';

export class DOMWrapper {
  #elements;
  #storage;

  constructor(elements = []) {
    if (isEmptyArray(elements)) {
      throw new Error(`DOMWrapper instance must include at least one node`);
    }

    this.#elements = [...elements];
    this.#storage = new Map();
  }

  forEach(callback) {
    this.#elements.forEach(callback);

    return this;
  }

  map(callback) {
    return this.#elements.map(callback);
  }

  get length() {
    return this.#elements.length;
  }

  nth(n) {
    return new DOMWrapper([this.#elements[n]]);
  }

  first() {
    return this.nth(0);
  }

  last() {
    return this.nth(this.length - 1);
  }

  odd() {
    const items = [];

    for (let i = 0; i < this.length; i += 2) {
      items.push(this.#elements[i]);
    }

    return new DOMWrapper(items);
  }

  even() {
    const items = [];

    for (let i = 1; i < this.length; i += 2) {
      items.push(this.#elements[i]);
    }

    return new DOMWrapper(items);
  }

  child(i = 0) {
    return this.#elements[i];
  }

  children() {
    return this.#elements;
  }

  get storage() {
    return this.#storage;
  }
}
