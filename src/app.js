import comics from '~/api/comics';
import $ from '~/lib/jeox';
import _ from '~/utils/common';

import parse from '~/lib/comicparse';

const App = (appElement) => {
  function render() {
    // console.info(state);

    $(appElement).toggleClass('xv-app--ready', state.ready);

    $(loadingElement).toggleClass('is-shown', state.loading);
    $(errorElement).toggleClass('is-shown', state.error);

    $(detailsElement).toggleClass(
      'is-shown',
      state.loading === false && state.error === false && state.comic
    );

    $(themeButton).text(
      `Go to the ${state.theme === 'light' ? 'dark' : 'light'} side!`
    );

    $(navbarButtons).attr(
      'disabled',
      state.disableNavbar ? 'disabled' : null
    );

    if (state.comic) {
      const comic = state.comic;

      const comicTitle = parse.title(comic);
      const comicAlt = parse.alt(comic);
      const comicDate = parse.date(comic);
      const comicTranscript = parse.date(comic);

      document.title = `xv - #${comic.num}`;

      $(imageElement).attr('title', comicAlt).attr('src', comic.img);

      $(comicTitleElement).text(comicTitle);
      $(comicAltElement).text(comicAlt);

      $(comicSourceLinkElement)
        .attr('href', `//xkcd.com/${comic.num}`)
        .text(`xkcd #${comic.num}`);

      $(comicImageLinkElement).attr('href', comic.img);

      $(comicDateElement).text(comicDate);
      $(comicTranscriptElement).html(comicTranscript);
    } else {
      document.title = `xv - comic viewer`;

      $(imageElement)
        .attr('title', null)
        .attr('src', null)
        .removeClass('is-shown');
    }
  }

  function listen() {
    $(window)
      .on('load', handleLocationChange)
      .on('hashchange', handleLocationChange)
      .on('resize', handleImageSizing)
      .on('keyup', handleKeyboardInput);

    $(imageElement)
      .on('load', handleImageLoad)
      .on('load', handleImageSizing);

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
    $(imageElement).addClass('is-shown');
  }

  function handleImageSizing() {
    const { width: figWidth, height: figHeight } = $(figureElement).rect();
    const { width: imgWidth, height: imgHeight } = $(imageElement).imageSize();

    $(figureElement)
      .toggleClass('is-center-x', imgWidth < figWidth)
      .toggleClass('is-center-y', imgHeight < figHeight);
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
      .then((comic) => {
        location.hash = comic.num;
      })
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
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  const documentElement = window.document.documentElement;

  const firstButton = $('button.is-first', appElement);
  const previousButton = $('button.is-previous', appElement);
  const randomButton = $('button.is-random', appElement);
  const nextButton = $('button.is-next', appElement);
  const currentButton = $('button.is-current', appElement);
  const themeButton = $('.bottomline .actions button', appElement);

  const figureElement = $('.figure', appElement);
  const imageElement = $('.figure-image', figureElement);
  const loadingElement = $('.figure-loading', figureElement);
  const errorElement = $('.figure-error', figureElement);

  const detailsElement = $('.details', appElement);
  const comicTitleElement = $('.comic-title', detailsElement);
  const comicAltElement = $('.comic-alt', detailsElement);
  const comicSourceLinkElement = $('.comic-sourcelink', detailsElement);
  const comicImageLinkElement = $('.comic-imagelink', detailsElement);
  const comicDateElement = $('.comic-date', detailsElement);
  const comicTranscriptElement = $('.comic-transcript', detailsElement);

  const navbarButtons = $('.navbar .actions button');

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
