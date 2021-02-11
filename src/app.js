import { $ } from '~/utils/dom';

import '~/app.css';

const App = (appElement) => {
  function render() {
    appElement.classList.toggle('xv-app--ready', state.ready);
  }

  function listen() {
    // ---
  }

  function update(change = {}) {
    state = { ...state, ...change };
    render();
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
  };

  listen();
  update({ ready: true });
};

export default App;
