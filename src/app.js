import comics from '~/api/comics';
import _ from '~/utils/common';
import { $, attr, toggleClass, text, append, empty } from '~/utils/dom';
import { parseTranscript, parseDate } from '~/utils/parser';

import '~/app.css';

const App = (appElement) => {
  function render() {
    console.info(state);

    toggleClass(appElement)('xv-app--ready', state.ready);
    toggleClass(appElement)('xv-app--loading', state.loading);
    toggleClass(appElement)('xv-app--error', state.error);

    if (state.comic) {
      attr(figureElement)('title', `${state.comic.alt} (click for original)`);
      attr(imageElement)('src', `${state.comic.img}`);

      text(headElement)(`${state.comic.title}`);
      text(leadElement)(`“${state.comic.alt}“`);

      attr(comicLinkElement)('href', `//xkcd.com/${state.comic.num}`);
      text(comicLinkElement)(`xkcd #${state.comic.num}`);

      attr(imageLinkElement)('href', `${state.comic.img}`);

      text(dateElement)(parseDate(state.comic));

      append(bodyElement)(parseTranscript(state.comic));
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

    firstButton.addEventListener('click', goFirst);
    previousButton.addEventListener('click', goPrevious);
    randomButton.addEventListener('click', goRandom);
    nextButton.addEventListener('click', goNext);
    currentButton.addEventListener('click', goCurrent);

    window.addEventListener('keyup', ({ key, shiftKey }) => {
      switch (key) {
        case 'ArrowLeft':
          shiftKey ? goFirst() : goPrevious();
          break;
        case 'R':
        case 'r':
          goRandom();
          break;
        case 'ArrowRight':
          shiftKey ? goCurrent() : goNext();
          break;
        default:
          break;
      }
    });
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
  }

  function handleImageSizes() {
    const {
      width: figWidth,
      height: figHeight,
    } = figureElement.getBoundingClientRect();

    const {
      naturalWidth: imgWidth,
      naturalHeight: imgHeight,
    } = imageElement;

    toggleClass(figureElement)('figure--center-x', imgWidth < figWidth);
    toggleClass(figureElement)('figure--center-y', imgHeight < figHeight);
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
    update({
      loading: false,
      error: false,
      num: comic.num,
      comic: comic,
    });

    return comic;
  }

  function setError(error) {
    console.error(error);
    update({ loading: false, error: true, comic: undefined });
  }

  function goFirst() {
    window.location.hash = 1;
  }

  function goPrevious() {
    window.location.hash = state.num - 1;
  }

  function goRandom() {
    comics
      .random()
      .then(setComic)
      .then((comic) => (location.hash = comic.num))
      .catch(setError);
  }

  function goNext() {
    window.location.hash = state.num + 1;
  }

  function goCurrent() {
    window.location.hash = '';
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
