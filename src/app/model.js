import { Emitter } from './emitter';

export class Model extends Emitter {
  #api;
  #comic;
  #theme;

  constructor(api) {
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

  #setTheme(theme) {
    this.#theme = theme;

    localStorage.setItem('xv-theme', theme);

    this.emit('theme', theme);
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

  theme(name) {
    this.#setTheme(name);
  }
}
