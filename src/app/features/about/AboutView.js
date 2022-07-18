import $ from '~/lib/jeox';

import { View } from '~/app/core';
import { Modal } from '~/app/shared';

export class AboutView extends View {
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
