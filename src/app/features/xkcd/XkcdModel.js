import { Model } from '#/app/core';

export class XkcdModel extends Model {
  #api;

  constructor(api) {
    super();

    this.#api = api;
  }

  #setComic(comic, type) {
    this.emit('comic', comic, type);
  }

  #setLoading() {
    this.#api.abort();

    this.emit('loading');
  }

  #setError(error) {
    this.emit('error', error);
  }

  get(num) {
    this.#setLoading();

    this.#api
      .get(num)
      .then((comic) => this.#setComic(comic, 'get'))
      .catch((error) => this.#setError(error));
  }

  random() {
    this.#setLoading();

    this.#api
      .random()
      .then((comic) => this.#setComic(comic, 'random'))
      .catch((error) => this.#setError(error));
  }

  current() {
    this.#setLoading();

    this.#api
      .current()
      .then((comic) => this.#setComic(comic, 'current'))
      .catch((error) => this.#setError(error));
  }
}
