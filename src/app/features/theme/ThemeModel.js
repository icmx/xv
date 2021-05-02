import Core from '~/app/core';

class ThemeModel extends Core.Model {
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

export default ThemeModel;
