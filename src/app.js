import _ from '~/utils/common';
import { $, attr, toggleClass, text, empty } from '~/utils/dom';

import '~/app.css';
import comics from './api/comics';

const App = (appElement) => {
  function render() {
    toggleClass(appElement)('xv-app--ready', state.ready);

    if (state.comic) {
      attr(figureElement)('href', `${state.comic.alt} (click for original)`);
      attr(imageElement)('src', `${state.comic.img}`);
    } else {
      attr(figureElement)('href', null);
      attr(imageElement)('src', null);
    }
  }

  function listen() {
    window.addEventListener('load', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
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

  const headElement = $('details__head');
  const leadElement = $('details__lead');
  const linkElement = $('details__link');
  const dateElement = $('details__date');
  const bodyElement = $('details__body');

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
