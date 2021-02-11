import _ from '~/utils/common';
import { $, attr, toggleClass, text, empty } from '~/utils/dom';

import '~/app.css';
import comics, { random } from './api/comics';

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

      text(headElement)(`${state.comic.head}`);
      text(leadElement)(`“${state.comic.lead}“`);

      attr(linkElement)('href', state.comic.href);
      text(linkElement)(`xkcd #${state.comic.num}`);

      text(dateElement)(`${state.comic.date}`);
    } else {
      attr(figureElement)('title', null);
      attr(imageElement)('src', null);
    }
  }

  function listen() {
    window.addEventListener('load', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    firstButton.addEventListener('click', () => {
      window.location.hash = 1;
    });

    previousButton.addEventListener('click', () => {
      if (state.comic) {
        window.location.hash = state.comic.num - 1;
      }
    });

    randomButton.addEventListener('click', () => {
      throw new Error(``);
    });

    nextButton.addEventListener('click', () => {
      if (state.comic) {
        window.location.hash = state.comic.num + 1;
      }
    });

    currentButton.addEventListener('click', () => {
      window.location.hash = '';
    });
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
  }

  function handleLocationChange() {
    update({ loading: true, error: false, comic: undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hash = window.location.hash.substring(1);

    if (hash === '') {
      comics.current().then(setComic).catch(setError);
    } else {
      const num = _.int(hash);
      comics.get(num).then(setComic).catch(setError);
    }
  }

  function setComic(comic) {
    update({ loading: false, error: false, comic: comic });

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
  const linkElement = $('.details__link');
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
