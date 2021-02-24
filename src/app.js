import comics from '~/api/comics';
import $ from '~/utils/dom';
import _ from '~/utils/common';
import { prepareTranscript, prepareDate } from '~/utils/parser';

import '~/app.css';

const App = (appElement) => {
  function render() {
    // console.info(state);

    $.toggleClass(appElement, 'xv-app--ready', state.ready);

    $.toggleClass(loadingElement, 'figure__loading--shown', state.loading);
    $.toggleClass(errorElement, 'figure__error--shown', state.error);

    $.toggleClass(
      detailsElement,
      'details--shown',
      state.loading === false && state.error === false && state.comic
    );

    $.text(
      themeButton,
      `Go to the ${state.theme === 'light' ? 'dark' : 'light'} side!`
    );

    _.each(navbarButtons, (item) =>
      $.attr(item, 'disabled', state.disableNavbar ? 'disabled' : null)
    );

    if (state.comic) {
      document.title = `xv - #${state.comic.num}`;

      $.attr(figureElement, 'title', `${state.comic.alt}`);
      $.attr(imageElement, 'src', `${state.comic.img}`);

      $.text(headElement, `${state.comic.title}`);
      $.text(leadElement, `“${state.comic.alt}“`);

      $.attr(comicLinkElement, 'href', `//xkcd.com/${state.comic.num}`);
      $.text(comicLinkElement, `xkcd #${state.comic.num}`);

      $.attr(imageLinkElement, 'href', `${state.comic.img}`);

      $.text(dateElement, prepareDate(state.comic));

      $.html(bodyElement, prepareTranscript(state.comic));
    } else {
      $.removeClass(imageElement, 'figure__image--shown');
      document.title = `xv - comic viewer`;

      $.attr(figureElement, 'title', null);
      $.attr(imageElement, 'src', null);
    }
  }

  function listen() {
    window.addEventListener('load', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('resize', handleImageSizing);
    window.addEventListener('keyup', handleKeyboardInput);

    imageElement.addEventListener('load', handleImageLoad);
    imageElement.addEventListener('load', handleImageSizing);

    themeButton.addEventListener('click', handleThemeSwitch);

    firstButton.addEventListener('click', goFirst);
    previousButton.addEventListener('click', goPrevious);
    randomButton.addEventListener('click', goRandom);
    nextButton.addEventListener('click', goNext);
    currentButton.addEventListener('click', goCurrent);
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
  }

  function handleImageLoad() {
    $.addClass(imageElement, 'figure__image--shown');
  }

  function handleImageSizing() {
    const {
      width: figWidth,
      height: figHeight,
    } = figureElement.getBoundingClientRect();

    const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imageElement;

    $.toggleClass(figureElement, 'figure--center-x', imgWidth < figWidth);
    $.toggleClass(figureElement, 'figure--center-y', imgHeight < figHeight);
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

  function handleKeyboardInput({ key, shiftKey }) {
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
  }

  function handleThemeSwitch() {
    const name = state.theme === 'light' ? 'dark' : 'light';

    update({ theme: name });
    localStorage.setItem('xv-theme', name);
    documentElement.setAttribute('data-xv-theme', name);
  }

  function goFirst() {
    window.location.hash = 1;
  }

  function goPrevious() {
    window.location.hash = state.num - 1;
  }

  function goRandom() {
    update({
      loading: true,
      error: false,
      disableNavbar: true,
      comic: undefined,
    });

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

  function setComic(comic) {
    update({
      loading: false,
      error: false,
      disableNavbar: false,
      num: comic.num,
      comic: comic,
    });

    return comic;
  }

  function setError(error) {
    console.error(error);
    update({ loading: false, error: true, comic: undefined });
  }

  const documentElement = window.document.documentElement;

  const firstButton = $.q('.button--first', appElement);
  const previousButton = $.q('.button--previous', appElement);
  const randomButton = $.q('.button--random', appElement);
  const nextButton = $.q('.button--next', appElement);
  const currentButton = $.q('.button--current', appElement);
  const themeButton = $.q('.button--theme', appElement);

  const figureElement = $.q('.figure', appElement);
  const imageElement = $.q('.figure__image', figureElement);
  const loadingElement = $.q('.figure__loading', figureElement);
  const errorElement = $.q('.figure__error', figureElement);

  const detailsElement = $.q('.details', appElement);
  const headElement = $.q('.details__head', detailsElement);
  const leadElement = $.q('.details__lead', detailsElement);
  const comicLinkElement = $.q('.details__comiclink', detailsElement);
  const imageLinkElement = $.q('.details__imagelink', detailsElement);
  const dateElement = $.q('.details__date', detailsElement);
  const bodyElement = $.q('.details__body', detailsElement);

  const navbarButtons = $.qa('.navbar__buttons .button');

  let state = {
    ready: false,
    loading: false,
    error: false,
    disableNavbar: false,
    num: -1,
    comic: undefined,
    theme: 'light',
  };

  listen();
  update({
    ready: true,
    theme: documentElement.getAttribute('data-xv-theme'),
  });
};

export default App;
