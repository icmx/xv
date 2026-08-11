import $ from '#/lib/domwrap';
import { View } from '../../core/View';
import { EVENT_THEME } from './constants';

export class ThemeView extends View {
  #document;
  #headMetaThemeColor;
  #colorScheme;

  #themeLightButton;
  #themeDarkButton;

  constructor(viewElement) {
    super(viewElement);

    this.#colorScheme = matchMedia('(prefers-color-scheme: dark)');

    this.#document = $(document.documentElement);
    this.#headMetaThemeColor = $(
      'meta[name="theme-color"]',
      this.#document
    );

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
    this.#updateThemeColor();
  }

  #getThemeName() {
    const attr = this.#document.attr('data-xv-theme');

    if (attr) {
      return attr;
    }

    return this.#colorScheme.matches ? 'dark' : 'light';
  }

  #updateThemeColor() {
    this.#headMetaThemeColor.attr(
      'content',
      this.#document.styleVar('color-background-main')
    );
  }

  #toggleThemeButtons() {
    const name = this.#getThemeName();

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
    this.emit(EVENT_THEME, name);
  }

  #listen() {
    $(this.#colorScheme).on('change', () => {
      this.#toggleThemeButtons();
      this.#updateThemeColor();
    });

    this.#themeDarkButton.on('click', () =>
      this.#handleThemeChange('dark')
    );

    this.#themeLightButton.on('click', () =>
      this.#handleThemeChange('light')
    );
  }

  setTheme(name) {
    this.#document.attr('data-xv-theme', name);

    this.#updateThemeColor();
    this.#toggleThemeButtons();
  }
}
