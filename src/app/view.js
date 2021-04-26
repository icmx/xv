import comicparse from '~/libs/comicparse';
import $ from '~/libs/jeox';
import _ from '~/utils';

import { Emitter } from './emitter';

export class View extends Emitter {
  #document;

  #navbarButtons;

  #firstButton;
  #previousButton;
  #randomButton;
  #nextButton;
  #currentButton;
  #themeButton;

  #figure;
  #image;
  #loading;
  #error;

  #details;
  #comicTitle;
  #comicAlt;
  #comicSourceLink;
  #comicImageLink;
  #comicDate;
  #comicTranscript;

  #num;

  constructor(appElement) {
    this.#document = $(document.documentElement);

    this.#navbarButtons = $('.navbar .actions button', appElement);

    this.#firstButton = $('button.is-first', appElement);
    this.#previousButton = $('button.is-previous', appElement);
    this.#randomButton = $('button.is-random', appElement);
    this.#nextButton = $('button.is-next', appElement);
    this.#currentButton = $('button.is-current', appElement);
    this.#themeButton = $('.bottomline .actions button', appElement);

    this.#figure = $('.figure', appElement);
    this.#image = $('.figure-image', this.#figure);
    this.#loading = $('.figure-loading', this.#figure);
    this.#error = $('.figure-error', this.#figure);

    this.#details = $('.details', appElement);
    this.#comicTitle = $('.comic-title', this.#details);
    this.#comicAlt = $('.comic-alt', this.#details);
    this.#comicSourceLink = $('.comic-sourcelink', this.#details);
    this.#comicImageLink = $('.comic-imagelink', this.#details);
    this.#comicDate = $('.comic-date', this.#details);
    this.#comicTranscript = $('.comic-transcript', this.#details);

    this.#num = undefined;

    this.#listen();
    this.#toggleThemeButtonText();
  }

  #scrollTop() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  #toggleThemeButtonText() {
    const theme = document.documentElement.getAttribute(
      'data-xv-theme'
    );

    $(this.#themeButton).text(
      `Go to the ${theme === 'light' ? 'dark' : 'light'} side!`
    );
  }

  #toggleNavbarButtons(state) {
    $(this.#navbarButtons).attr(
      'disabled',
      state === true ? null : 'disabled'
    );
  }

  #clearView() {
    this.#title = `xv - comic viewer`;

    $(this.#image).attr('title', null).attr('src', null);

    $(this.#image).removeClass('is-shown');
    $(this.#details).removeClass('is-shown');
  }

  #handleWindowLocationChange() {
    this.#scrollTop();

    if (this.#hash === '') {
      this.emit('current');
    } else {
      const num = _.int(this.#hash);

      this.emit('get', num);
    }
  }

  #handleWindowResize() {
    const { width: figureWidth, height: figureHeight } = $(
      this.#figure
    ).rect();

    const { width: imageWidth, height: imageHeight } = $(
      this.#image
    ).imageSize();

    $(this.#figure)
      .toggleClass('is-center-x', imageWidth < figureWidth)
      .toggleClass('is-center-y', imageHeight < figureHeight);
  }

  #handleKeyboardInput({ key, shiftKey }) {
    switch (key) {
      case 'ArrowLeft':
        shiftKey ? this.#goFirst() : this.#goPrevious();
        break;

      case 'R':
      case 'r':
        this.#goRandom();
        break;

      case 'ArrowRight':
        shiftKey ? this.#goCurrent() : this.#goNext();
        break;

      default:
        break;
    }
  }

  #handleImageLoading() {
    $(this.#image).addClass('is-shown');
    $(this.#loading).removeClass('is-shown');
  }

  #handleThemeSwitching() {
    const name =
      document.documentElement.getAttribute('data-xv-theme') === 'light'
        ? 'dark'
        : 'light';

    this.emit('theme', name);
  }

  #goFirst() {
    this.#hash = 1;
  }

  #goPrevious() {
    this.#hash = this.#num - 1;
  }

  #goRandom() {
    this.#toggleNavbarButtons(false);
    this.emit('random');
  }

  #goNext() {
    this.#hash = this.#num + 1;
  }

  #goCurrent() {
    this.#hash = '';
  }

  #listen() {
    $(window)
      .on('load', () => this.#handleWindowLocationChange())
      .on('hashchange', () => this.#handleWindowLocationChange())
      .on('resize', () => this.#handleWindowResize())
      .on('keyup', (event) => this.#handleKeyboardInput(event));

    $(this.#image)
      .on('load', () => this.#handleImageLoading())
      .on('load', () => this.#handleWindowResize());

    $(this.#firstButton).on('click', () => this.#goFirst());
    $(this.#previousButton).on('click', () => this.#goPrevious());
    $(this.#randomButton).on('click', () => this.#goRandom());
    $(this.#nextButton).on('click', () => this.#goNext());
    $(this.#currentButton).on('click', () => this.#goCurrent());

    $(this.#themeButton).on('click', () =>
      this.#handleThemeSwitching()
    );
  }

  get #hash() {
    return window.location.hash.substring(1);
  }

  set #hash(value) {
    window.location.hash = value;
  }

  get #title() {
    return document.title;
  }

  set #title(value) {
    document.title = value;
  }

  setComic(comic) {
    this.#toggleNavbarButtons(true);

    const title = comicparse.title(comic);
    const alt = comicparse.alt(comic);
    const date = comicparse.date(comic);
    const transcript = comicparse.transcript(comic);

    this.#title = `xv - #${comic.num}`;

    if (this.#num !== comic.num && this.#hash !== '') {
      this.#hash = comic.num;
    }

    this.#num = comic.num;

    $(this.#image).attr('title', alt).attr('src', comic.img);

    $(this.#comicTitle).text(title);
    $(this.#comicAlt).text(alt);

    $(this.#comicSourceLink)
      .attr('href', `//xkcd.com/${comic.num}`)
      .text(`xkcd #${comic.num}`);

    $(this.#comicImageLink).attr('href', comic.img);

    $(this.#comicDate).text(date);
    $(this.#comicTranscript).html(transcript);

    $(this.#details).addClass('is-shown');
    $(this.#error).removeClass('is-shown');
  }

  setLoading() {
    this.#clearView();

    $(this.#loading).addClass('is-shown');
    $(this.#error).removeClass('is-shown');
  }

  setError() {
    this.#clearView();

    $(this.#loading).removeClass('is-shown');
    $(this.#error).addClass('is-shown');
  }

  setTheme(theme) {
    $(this.#document).attr('data-xv-theme', theme);

    this.#toggleThemeButtonText();
  }
}
