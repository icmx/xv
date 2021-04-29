import Core from '~/app/core';

export class ThemeModel extends Core.Model {
  #theme;

  constructor() {
    super();

    this.#theme = undefined;
  }

  #setTheme(theme) {
    this.#theme = theme;

    localStorage.setItem('xv-theme', theme);

    this.emit('theme', theme);
  }

  theme(name) {
    this.#setTheme(name);
  }
}
