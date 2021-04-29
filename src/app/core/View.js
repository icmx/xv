import { Emitter } from './Emitter';

export class View extends Emitter {
  #viewElement;

  constructor(viewElement) {
    super();

    this.#viewElement = viewElement;
  }
}
