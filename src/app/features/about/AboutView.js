import $ from '~/lib/jeox';

import Core from '~/app/core';

class AboutView extends Core.View {
  #modal;
  #openButton;

  constructor(viewElement) {
    super(viewElement);

    this.#modal = $('.modal', viewElement);
    this.#openButton = $('.is-open-about', viewElement);

    this.#listen();
  }

  #listen() {
    this.#openButton.on('click', () => this.#modal.child().showModal());
  }
}

export default AboutView;
