import $ from '#/lib/domwrap';
import { View } from '../../core/View';
import { Dialog } from '../../shared/Dialog';

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
