import Core from '~/app/core';

export class ComicController extends Core.Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on('comic', (comic, type) => this.view.setComic(comic, type));
    this.model.on('loading', () => this.view.setLoading());
    this.model.on('error', (error) => this.view.setError(error));

    this.view.on('get', (num) => this.model.get(num));
    this.view.on('random', () => this.model.random());
    this.view.on('current', () => this.model.current());
  }
}
