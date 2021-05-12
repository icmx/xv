import $ from '~/lib/jeox';

import Core from '~/app/core';

class AboutView extends Core.View {
  #modal;
  #backdrop;
  #openButton;
  #closeAreas;

  constructor(viewElement) {
    super(viewElement);

    this.#modal = $('.modal', viewElement);
    this.#backdrop = $('.backdrop', viewElement);
    this.#openButton = $('.is-open-about', viewElement);

    this.#closeAreas = $('.is-close-about, .backdrop');

    this.#modal.display({ showClassName: 'is-shown' });
    this.#backdrop.display({ showClassName: 'is-shown' });

    this.#listen();
  }

  #displayModal(state) {
    this.#modal.display(state);
    this.#backdrop.display(state);
  }

  #listen() {
    this.#openButton.on('click', () => this.#displayModal(true));
    this.#closeAreas.on('click', () => this.#displayModal(false));
  }
}

export default AboutView;
