import Core from '~/app/core';

export class ComicModel extends Core.Model {
  #api;
  #comic;

  constructor(api) {
    super();

    this.#api = api;
    this.#comic = undefined;
  }

  #setComic(comic) {
    this.#comic = comic;

    this.emit('comic', comic);
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
      .then((comic) => this.#setComic(comic))
      .catch(() => this.#setError());
  }

  random() {
    this.#setLoading();

    this.#api
      .random()
      .then((comic) => this.#setComic(comic))
      .catch(() => this.#setError());
  }

  current() {
    this.#setLoading();

    this.#api
      .current()
      .then((comic) => this.#setComic(comic))
      .catch(() => this.#setError());
  }
}
