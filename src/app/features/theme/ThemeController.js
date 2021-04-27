import Core from '~/app/core';

export class ThemeController extends Core.Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on('theme', (theme) => this.view.setTheme(theme));

    this.view.on('theme', (name) => this.model.theme(name));
  }
}
