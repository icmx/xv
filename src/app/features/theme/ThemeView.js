import $ from '~/lib/jeox';

import Core from '~/app/core';

class ThemeView extends Core.View {
  #document;

  #themeSystemButton;
  #themeLightButton;
  #themeDarkButton;

  constructor(viewElement) {
    super(viewElement);

    this.#document = $(document.documentElement);

    this.#themeSystemButton = $('.is-theme-system', viewElement);
    this.#themeLightButton = $('.is-theme-light', viewElement);
    this.#themeDarkButton = $('.is-theme-dark', viewElement);

    this.#listen();
    this.#toggleThemeButtons();
  }

  #toggleThemeButtons() {
    const name = this.#document.attr('data-xv-theme');

    switch (name) {
      case 'dark':
        this.#themeDarkButton.toggleClass('is-hidden', true);
        this.#themeLightButton.toggleClass('is-hidden', false);
        this.#themeSystemButton.toggleClass('is-hidden', true);
        break;

      case 'light':
        this.#themeDarkButton.toggleClass('is-hidden', true);
        this.#themeLightButton.toggleClass('is-hidden', true);
        this.#themeSystemButton.toggleClass('is-hidden', false);
        break;

      case 'system':
        this.#themeDarkButton.toggleClass('is-hidden', false);
        this.#themeLightButton.toggleClass('is-hidden', true);
        this.#themeSystemButton.toggleClass('is-hidden', true);
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

    this.#themeSystemButton.on('click', () =>
      this.#handleThemeChange('system')
    );
  }

  setTheme(theme) {
    this.#document.attr('data-xv-theme', theme);

    this.#toggleThemeButtons();
  }
}

export default ThemeView;
