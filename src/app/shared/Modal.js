import $ from '~/lib/jeox';

export class Modal {
  #modalElement;
  #closeElement;
  #backdropElement;

  constructor(modalElement, closeElement, backdropElement) {
    this.#modalElement = $(modalElement);
    this.#modalElement.display({ showClassName: 'is-shown' });

    this.#closeElement = closeElement;

    this.#backdropElement = $(backdropElement);
    this.#backdropElement.display({ showClassName: 'is-shown' });

    this.#listen();
  }

  #listen() {
    this.#closeElement.on('click', () => this.hide());
    this.#backdropElement.on('click', () => this.hide());
  }

  display(state) {
    this.#modalElement.display(state);
    this.#backdropElement.display(state);
  }

  show() {
    this.#modalElement.show();
    this.#backdropElement.show();
  }

  hide() {
    this.#modalElement.hide();
    this.#backdropElement.hide();
  }
}
