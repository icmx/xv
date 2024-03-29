import $ from '#/lib/domwrap';

export class Dialog {
  #dialogElement;
  #dialogElementChild;
  #showElement;
  #closeElement;

  constructor(dialogElement, showElement, closeElement) {
    this.#dialogElement = $(dialogElement);
    this.#dialogElementChild = this.#dialogElement.nodes.at(0);
    this.#showElement = $(showElement);
    this.#closeElement = $(closeElement);

    this.#listen();
  }

  #listen() {
    this.#dialogElement.on('click', (event) => {
      const rect = this.#dialogElement.rect();

      if (
        event.clientY < rect.top ||
        event.clientY > rect.bottom ||
        event.clientX < rect.left ||
        event.clientX > rect.right
      ) {
        this.#dialogElementChild.close();
      }
    });

    this.#showElement.on('click', () =>
      this.#dialogElementChild.showModal()
    );
    this.#closeElement.on('click', () =>
      this.#dialogElementChild.close()
    );
  }
}
