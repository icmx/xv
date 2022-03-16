import $ from '~/lib/jeox';

import Core from '~/app/core';

class ThemeView extends Core.View {
  #document;
  #headMetaThemeColor;

  #themeLightButton;
  #themeDarkButton;

  constructor(viewElement) {
    super(viewElement);

    this.#document = $(document.documentElement);
    this.#headMetaThemeColor = $('meta[name="theme-color"]', this.#document);

    this.#themeLightButton = $('.is-theme-light', viewElement);
    this.#themeDarkButton = $('.is-theme-dark', viewElement);

    this.#themeLightButton.display({
      showClassName: 'is-shown',
      hideClassName: 'is-hidden',
    });

    this.#themeDarkButton.display({
      showClassName: 'is-shown',
      hideClassName: 'is-hidden',
    });

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
    this.#themeDarkButton.on('click', () => this.#handleThemeChange('dark'));
    this.#themeLightButton.on('click', () => this.#handleThemeChange('light'));
  }

  setTheme(theme) {
    this.#document.attr('data-xv-theme', theme);

    this.#headMetaThemeColor.attr(
      'content',
      this.#document.styleVar('color-background-main')
    );

    this.#toggleThemeButtons();
  }
}

export default ThemeView;
