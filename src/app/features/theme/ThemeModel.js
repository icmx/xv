import { Model } from '~/app/core';

export class ThemeModel extends Model {
  constructor() {
    super();
  }

  #setTheme(theme) {
    localStorage.setItem('xv-theme', theme);

    this.emit('theme', theme);
  }

  theme(name) {
    this.#setTheme(name);
  }
}
