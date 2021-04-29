import Core from '~/app/core';

export class ComicModel extends Core.Model {
  #api;
  #comic;
  #type;

  constructor(api) {
    super();

    this.#api = api;
    this.#comic = undefined;
    this.#type = undefined;
  }

  #setComic(comic, type) {
    this.#comic = comic;
    this.#type = type;

    this.emit('comic', comic, type);
  }

  #setLoading() {
    this.emit('loading');
  }

  #setError() {
    this.#comic = undefined;

    this.emit('error');
  }

  get(num) {
    this.#setLoading();

    this.#api
      .get(num)
      .then((comic) => this.#setComic(comic, 'get'))
      .catch(() => this.#setError());
  }

  random() {
    this.#setLoading();

    this.#api
      .random()
      .then((comic) => this.#setComic(comic, 'random'))
      .catch(() => this.#setError());
  }

  current() {
    this.#setLoading();

    this.#api
      .current()
      .then((comic) => this.#setComic(comic, 'current'))
      .catch(() => this.#setError());
  }
}
