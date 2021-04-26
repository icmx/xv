export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.model.on('comic', (comic) => this.view.setComic(comic));
    this.model.on('loading', () => this.view.setLoading());
    this.model.on('error', () => this.view.setError());
    this.model.on('theme', (theme) => this.view.setTheme(theme));

    this.view.on('get', (num) => this.model.get(num));
    this.view.on('random', () => this.model.random());
    this.view.on('current', () => this.model.current());
    this.view.on('theme', (name) => this.model.theme(name));
  }
}
