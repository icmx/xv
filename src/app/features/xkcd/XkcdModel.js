import { Model } from '../../core/Model';
import {
  EVENT_COMIC_BYNUM,
  EVENT_COMIC_CURRENT,
  EVENT_COMIC_RANDOM,
  EVENT_ERROR,
  EVENT_LOADING,
} from './constants';

export class XkcdModel extends Model {
  #api;

  constructor(api) {
    super();

    this.#api = api;
  }

  #setLoading() {
    this.#api.abortRequest();

    this.emit(EVENT_LOADING);
  }

  #setError(error) {
    this.emit(EVENT_ERROR, error);
  }

  async getByNum(num) {
    this.#setLoading();

    try {
      const comic = await this.#api.getByNum(num);

      this.emit(EVENT_COMIC_BYNUM, comic);
    } catch (error) {
      this.#setError(error);
    }
  }

  async getRandom() {
    this.#setLoading();

    try {
      const comic = await this.#api.getRandom();

      this.emit(EVENT_COMIC_RANDOM, comic);
    } catch (error) {
      this.#setError(error);
    }
  }

  async getCurrent() {
    this.#setLoading();

    try {
      const comic = await this.#api.getCurrent();

      this.emit(EVENT_COMIC_CURRENT, comic);
    } catch (error) {
      this.#setError(error);
    }
  }
}
