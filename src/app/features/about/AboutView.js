import $ from '~/lib/jeox';

import Core from '~/app/core';
import Modal from '~/app/shared/Modal';

class AboutView extends Core.View {
  #openButton;
  #modal;

  constructor(viewElement) {
    super(viewElement);

    this.#openButton = $('.is-open-about', viewElement);

    this.#modal = new Modal(
      $('.modal', viewElement),
      $('.modal-close', viewElement),
      $('.backdrop', viewElement)
    );

    this.#listen();
  }

  #listen() {
    this.#openButton.on('click', () => this.#modal.show());
  }
}

export default AboutView;
