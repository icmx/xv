import _ from '~/utils/common';
import { $, attr, toggleClass, text, append, empty } from '~/utils/dom';
import { parseTranscript, parseDate } from '~/utils/parser';
import comics from '~/api/comics';

import '~/app.css';

const App = (appElement) => {
  function render() {
    console.info(state);

    toggleClass(appElement)('xv-app--ready', state.ready);
    toggleClass(appElement)('xv-app--loading', state.loading);
    toggleClass(appElement)('xv-app--error', state.error);

    if (state.comic) {
      attr(figureElement)(
        'title',
        `${state.comic.alt} (click for original)`
      );
      attr(imageElement)('src', `${state.comic.img}`);

      text(headElement)(`${state.comic.title}`);
      text(leadElement)(`“${state.comic.alt}“`);

      attr(comicLinkElement)('href', `//xkcd.com/${state.comic.num}`);
      text(comicLinkElement)(`xkcd #${state.comic.num}`);

      attr(imageLinkElement)('href', `${state.comic.img}`);

      text(dateElement)(parseDate(state.comic));

      // text(bodyElement)(state.comic.transcript)
      append(bodyElement)(parseTranscript(state.comic))
    } else {
      attr(figureElement)('title', null);
      attr(imageElement)('src', null);

      empty(bodyElement);
    }
  }

  function listen() {
    window.addEventListener('load', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('resize', handleImageSizes);

    imageElement.addEventListener('load', handleImageSizes);

    firstButton.addEventListener('click', () => {
      window.location.hash = 1;
    });

    previousButton.addEventListener('click', () => {
      window.location.hash = state.num - 1;
    });

    randomButton.addEventListener('click', () => {
      throw new Error(``);
    });

    nextButton.addEventListener('click', () => {
      window.location.hash = state.num + 1;
    });

    currentButton.addEventListener('click', () => {
      window.location.hash = '';
    });
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
  }

  function handleImageSizes() {
    const {
      width: figureWidth,
      height: figureHeight,
    } = figureElement.getBoundingClientRect();

    const {
      naturalWidth: imageWidth,
      naturalHeight: imageHeight,
    } = imageElement;

    toggleClass(figureElement)('figure--center-x', imageWidth < figureWidth);
    toggleClass(figureElement)('figure--center-y', imageHeight < figureHeight);
  }

  function handleLocationChange() {
    update({ loading: true, error: false, comic: undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hash = window.location.hash.substring(1);

    if (hash === '') {
      comics.current().then(setComic).catch(setError);
    } else {
      const num = _.int(hash);
      update({ num: num });
      comics.get(num).then(setComic).catch(setError);
    }
  }

  function setComic(comic) {
    update({ loading: false, error: false, num: comic.num, comic: comic });

    return comic;
  }

  function setError(error) {
    console.error(error);
    update({ loading: false, error: true, comic: undefined });
  }

  const firstButton = $('.button--first');
  const previousButton = $('.button--previous');
  const randomButton = $('.button--random');
  const nextButton = $('.button--next');
  const currentButton = $('.button--current');

  const figureElement = $('.figure');
  const imageElement = $('.figure__image', figureElement);

  const headElement = $('.details__head');
  const leadElement = $('.details__lead');
  const comicLinkElement = $('.details__comiclink');
  const imageLinkElement = $('.details__imagelink');
  const dateElement = $('.details__date');
  const bodyElement = $('.details__body');

  let state = {
    ready: false,
    loading: false,
    error: false,
    num: -1,
    comic: undefined,
  };

  listen();
  update({ ready: true });
};

export default App;
