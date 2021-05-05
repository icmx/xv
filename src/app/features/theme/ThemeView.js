import $ from '~/lib/jeox';

import Core from '~/app/core';

class ThemeView extends Core.View {
  #document;

  #themeLightButton;
  #themeDarkButton;

  constructor(viewElement) {
    super(viewElement);

    this.#document = $(document.documentElement);

    this.#themeLightButton = $('.is-theme-light', viewElement);
    this.#themeDarkButton = $('.is-theme-dark', viewElement);

    this.#themeLightButton.display({ showClassName: 'is-shown' });
    this.#themeDarkButton.display({ showClassName: 'is-shown' });

    this.#listen();
    this.#toggleThemeButtons();
  }

  #toggleThemeButtons() {
    const name = this.#document.attr('data-xv-theme');

    switch (name) {
      case 'dark':
        this.#themeLightButton.show();
        this.#themeDarkButton.hide();
        break;

      case 'light':
        this.#themeLightButton.hide();
        this.#themeDarkButton.show();
        break;

      default:
        break;
    }
  }

  #handleThemeChange(name) {
    this.emit('theme', name);
  }

  #listen() {
    this.#themeDarkButton.on('click', () =>
      this.#handleThemeChange('dark')
    );

    this.#themeLightButton.on('click', () =>
      this.#handleThemeChange('light')
    );
  }

  setTheme(theme) {
    this.#document.attr('data-xv-theme', theme);

    this.#toggleThemeButtons();
  }
}

export default ThemeView;
