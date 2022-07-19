import $ from '~/lib/jeox';

import { View } from '~/app/core';
import { Dialog } from '~/app/shared';

export class AboutView extends View {
  #dialog;

  constructor(viewElement) {
    super(viewElement);

    this.#dialog = new Dialog(
      $('.dialog'),
      $('.is-open-about'),
      $('.dialog-close')
    );
  }
}
