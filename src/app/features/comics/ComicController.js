import Core from '~/app/core';

export class ComicController extends Core.Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on('comic', (comic) => this.view.setComic(comic));
    this.model.on('loading', () => this.view.setLoading());
    this.model.on('error', () => this.view.setError());

    this.view.on('get', (num) => this.model.get(num));
    this.view.on('random', () => this.model.random());
    this.view.on('current', () => this.model.current());
  }
}
