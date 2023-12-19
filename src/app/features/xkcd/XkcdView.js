import $ from '#/lib/jeox';
import xkcdparse from '#/lib/xkcdparse';
import { View } from '../../core/View';
import { isInt } from '../../utils/isInt';
import { toInt } from '../../utils/toInt';
import {
  EVENT_COMIC_BYNUM,
  EVENT_COMIC_CURRENT,
  EVENT_COMIC_RANDOM,
} from './constants';

export class XkcdView extends View {
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

    this.#navbarButtons = $('.appbar.is-bottom .action', viewElement);

    this.#firstButton = $('.action.is-first', viewElement);
    this.#previousButton = $('.action.is-previous', viewElement);
    this.#randomButton = $('.action.is-random', viewElement);
    this.#nextButton = $('.action.is-next', viewElement);
    this.#currentButton = $('.action.is-current', viewElement);

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
    scrollTo({ top: 0, behavior: 'auto' });
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
      this.emit(EVENT_COMIC_CURRENT);
    } else {
      const num = toInt(this.#hash);

      if (isInt(num)) {
        this.#num = num;
      }

      this.emit(EVENT_COMIC_BYNUM, num);
    }
  }

  #handleWindowResize() {
    const { width: figureWidth, height: figureHeight } =
      this.#figure.rect();

    const { width: imageWidth, height: imageHeight } =
      this.#image.imageSize();

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
    this.#navbarButtons.disable();
    this.emit(EVENT_COMIC_RANDOM);
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
    return location.hash.substring(1);
  }

  set #hash(value) {
    location.hash = value;
  }

  get #title() {
    return document.title;
  }

  set #title(value) {
    document.title = value;
  }

  setByNum(comic) {
    this.#navbarButtons.enable();

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

  setRandom(comic) {
    this.setByNum(comic);

    this.#hash = comic.num;
  }

  setCurrent(comic) {
    this.setByNum(comic);

    this.#num = comic.num;

    this.#nextButton.disable();
    this.#currentButton.disable();
  }

  setLoading() {
    this.#clearView();

    this.#loading.show();
    this.#error.hide();
  }

  setError(error) {
    this.#clearView();

    if (error.name !== 'AbortError') {
      console.error(error);

      this.#loading.hide();
      this.#error.show();
    }

    if (!isInt(this.#num)) {
      this.num = 1;
    }
  }
}
