import { Controller } from '../../core/Controller';
import {
  EVENT_COMIC_BYNUM,
  EVENT_COMIC_CURRENT,
  EVENT_COMIC_RANDOM,
  EVENT_ERROR,
  EVENT_LOADING,
} from './constants';

export class XkcdController extends Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on(EVENT_COMIC_BYNUM, (comic) =>
      this.view.setByNum(comic)
    );

    this.model.on(EVENT_COMIC_RANDOM, (comic) =>
      this.view.setRandom(comic)
    );

    this.model.on(EVENT_COMIC_CURRENT, (comic) =>
      this.view.setCurrent(comic)
    );

    this.model.on(EVENT_LOADING, () => this.view.setLoading());
    this.model.on(EVENT_ERROR, (error) => this.view.setError(error));

    this.view.on(EVENT_COMIC_BYNUM, (num) => this.model.getByNum(num));
    this.view.on(EVENT_COMIC_RANDOM, () => this.model.getRandom());
    this.view.on(EVENT_COMIC_CURRENT, () => this.model.getCurrent());
  }
}
