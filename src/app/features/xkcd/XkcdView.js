import $ from '~/lib/jeox';
import xkcdparse from '~/lib/xkcdparse';

import Core from '~/app/core';
import int from '~/app/utils/int';
import isInt from '~/app/utils/isInt';

class XkcdView extends Core.View {
  #navbarButtons;

  #firstButton;
  #previousButton;
  #randomButton;
  #nextButton;
  #currentButton;

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

  constructor(viewElement) {
    super(viewElement);

    this.#navbarButtons = $('.appbar.is-bottom button', viewElement);

    this.#firstButton = $('button.is-first', viewElement);
    this.#previousButton = $('button.is-previous', viewElement);
    this.#randomButton = $('button.is-random', viewElement);
    this.#nextButton = $('button.is-next', viewElement);
    this.#currentButton = $('button.is-current', viewElement);

    this.#figure = $('.figure', viewElement);
    this.#image = $('.figure-image', this.#figure);
    this.#loading = $('.figure-loading', this.#figure);
    this.#error = $('.figure-error', this.#figure);

    this.#details = $('.details', viewElement);
    this.#comicTitle = $('.comic-title', this.#details);
    this.#comicAlt = $('.comic-alt', this.#details);
    this.#comicSourceLink = $('.comic-sourcelink', this.#details);
    this.#comicImageLink = $('.comic-imagelink', this.#details);
    this.#comicDate = $('.comic-date', this.#details);
    this.#comicTranscript = $('.comic-transcript', this.#details);

    this.#image.display({ showClassName: 'is-shown' });
    this.#loading.display({ showClassName: 'is-shown' });
    this.#error.display({ showClassName: 'is-shown' });

    this.#details.display({ showClassName: 'is-shown' });

    this.#num = undefined;

    this.#listen();
  }

  #scrollTop() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  #toggleNavbarButtons(state) {
    this.#navbarButtons.attr(
      'disabled',
      state === true ? null : 'disabled'
    );
  }

  #clearView() {
    this.#title = `xv - comic viewer`;

    this.#image.attr('title', null).attr('src', null);

    this.#image.hide();
    this.#details.hide();
  }

  #handleWindowLocationChange() {
    this.#scrollTop();

    if (this.#hash === '') {
      this.emit('current');
    } else {
      const num = int(this.#hash);

      if (isInt(num)) {
        this.#num = num;
      }

      this.emit('get', num);
    }
  }

  #handleWindowResize() {
    const {
      width: figureWidth,
      height: figureHeight,
    } = this.#figure.rect();

    const {
      width: imageWidth,
      height: imageHeight,
    } = this.#image.imageSize();

    this.#figure
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
    this.#image.show();
    this.#loading.hide();
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
      .on('keydown', (event) => this.#handleKeyboardInput(event));

    this.#image
      .on('load', () => this.#handleImageLoading())
      .on('load', () => this.#handleWindowResize());

    this.#firstButton.on('click', () => this.#goFirst());
    this.#previousButton.on('click', () => this.#goPrevious());
    this.#randomButton.on('click', () => this.#goRandom());
    this.#nextButton.on('click', () => this.#goNext());
    this.#currentButton.on('click', () => this.#goCurrent());
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

  setComic(comic, type) {
    this.#toggleNavbarButtons(true);

    switch (type) {
      case 'current':
        this.#num = comic.num;
        break;

      case 'random':
        this.#hash = comic.num;
        break;

      default:
        break;
    }

    const title = xkcdparse.title(comic);
    const alt = xkcdparse.alt(comic);
    const date = xkcdparse.date(comic);
    const transcript = xkcdparse.transcript(comic);

    this.#title = `xv - #${comic.num}`;

    this.#image.attr('title', alt).attr('src', comic.img);

    this.#comicTitle.text(title);
    this.#comicAlt.text(alt);

    this.#comicSourceLink
      .attr('href', `//xkcd.com/${comic.num}`)
      .text(`xkcd #${comic.num}`);

    this.#comicImageLink.attr('href', comic.img);

    this.#comicDate.text(date);
    this.#comicTranscript.html(transcript);

    this.#details.show();
    this.#error.hide();
  }

  setLoading() {
    this.#clearView();

    this.#loading.show();
    this.#error.hide();
  }

  setError(error) {
    this.#clearView();

    console.error(error);

    if (error.name !== 'AbortError') {
      this.#loading.hide();
      this.#error.show();
    }
  }
}

export default XkcdView;
