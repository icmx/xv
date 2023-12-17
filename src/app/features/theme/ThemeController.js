import { Controller } from '#/app/core';

export class ThemeController extends Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on('theme', (theme) => this.view.setTheme(theme));

    this.view.on('theme', (name) => this.model.theme(name));
  }
}
