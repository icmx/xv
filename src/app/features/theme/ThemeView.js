import $ from '~/lib/jeox';

import Core from '~/app/core';

class ThemeView extends Core.View {
  #document;
  #themeButton;

  constructor(viewElement) {
    super(viewElement);

    this.#document = $(document.documentElement);

    this.#themeButton = $('.bottombar .actions button', viewElement);

    this.#listen();
    this.#toggleThemeButtonText();
  }

  #toggleThemeButtonText() {
    const theme = document.documentElement.getAttribute(
      'data-xv-theme'
    );

    $(this.#themeButton).text(
      `Go to the ${theme === 'light' ? 'dark' : 'light'} side!`
    );
  }

  #handleThemeSwitching() {
    const name =
      document.documentElement.getAttribute('data-xv-theme') === 'light'
        ? 'dark'
        : 'light';

    this.emit('theme', name);
  }

  #listen() {
    $(this.#themeButton).on('click', () =>
      this.#handleThemeSwitching()
    );
  }

  setTheme(theme) {
    $(this.#document).attr('data-xv-theme', theme);

    this.#toggleThemeButtonText();
  }
}

export default ThemeView;
