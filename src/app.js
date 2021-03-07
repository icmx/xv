import comics from '~/api/comics';
import $ from '~/lib/elementshell';
import _ from '~/utils/common';
import { prepareTranscript, prepareDate } from '~/utils/parser';

const App = (appElement) => {
  function render() {
    // console.info(state);

    $(appElement).toggleClass('xv-app--ready', state.ready);

    $(loadingElement).toggleClass('figure__loading--shown', state.loading);
    $(errorElement).toggleClass('figure__error--shown', state.error);

    $(detailsElement).toggleClass(
      'details--shown',
      state.loading === false && state.error === false && state.comic
    );

    $(themeButton).text(
      `Go to the ${state.theme === 'light' ? 'dark' : 'light'} side!`
    );

    $(navbarButtons).attr('disabled', state.disableNavbar ? 'disabled' : null);

    if (state.comic) {
      document.title = `xv - #${state.comic.num}`;

      $(figureElement).attr('title', `${state.comic.alt}`);
      $(imageElement).attr('src', `${state.comic.img}`);

      $(headElement).text(`${state.comic.title}`);
      $(leadElement).text(`“${state.comic.alt}“`);

      $(comicLinkElement)
        .attr('href', `//xkcd.com/${state.comic.num}`)
        .text(`xkcd #${state.comic.num}`);

      $(imageLinkElement).attr('href', `${state.comic.img}`);

      $(dateElement).text(prepareDate(state.comic));

      $(bodyElement).html(prepareTranscript(state.comic));
    } else {
      $(imageElement).removeClass('figure__image--shown');
      document.title = `xv - comic viewer`;

      $(figureElement).attr('title', null);
      $(imageElement).attr('src', null);
    }
  }

  function listen() {
    $(window)
      .on('load', handleLocationChange)
      .on('hashchange', handleLocationChange)
      .on('resize', handleImageSizing)
      .on('keyup', handleKeyboardInput);

    $(imageElement).on('load', handleImageLoad).on('load', handleImageSizing);

    $(themeButton).on('click', handleThemeSwitch);

    $(firstButton).on('click', goFirst);
    $(previousButton).on('click', goPrevious);
    $(randomButton).on('click', goRandom);
    $(nextButton).on('click', goNext);
    $(currentButton).on('click', goCurrent);
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
  }

  function handleImageLoad() {
    $(imageElement).addClass('figure__image--shown');
  }

  function handleImageSizing() {
    const { width: figWidth, height: figHeight } = $(figureElement).rect();

    const { width: imgWidth, height: imgHeight } = $(imageElement).imageSize();

    $(figureElement)
      .toggleClass('figure--center-x', imgWidth < figWidth)
      .toggleClass('figure--center-y', imgHeight < figHeight);
  }

  function handleLocationChange() {
    update({ loading: true, error: false, comic: undefined });
    scrollTop();

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
    scrollTop();

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

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const documentElement = window.document.documentElement;

  const firstButton = $('.button--first', appElement);
  const previousButton = $('.button--previous', appElement);
  const randomButton = $('.button--random', appElement);
  const nextButton = $('.button--next', appElement);
  const currentButton = $('.button--current', appElement);
  const themeButton = $('.button--theme', appElement);

  const figureElement = $('.figure', appElement);
  const imageElement = $('.figure__image', figureElement);
  const loadingElement = $('.figure__loading', figureElement);
  const errorElement = $('.figure__error', figureElement);

  const detailsElement = $('.details', appElement);
  const headElement = $('.details__head', detailsElement);
  const leadElement = $('.details__lead', detailsElement);
  const comicLinkElement = $('.details__comiclink', detailsElement);
  const imageLinkElement = $('.details__imagelink', detailsElement);
  const dateElement = $('.details__date', detailsElement);
  const bodyElement = $('.details__body', detailsElement);

  const navbarButtons = $('.navbar__buttons .button');

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
