import Emitter from './Emitter';

class View extends Emitter {
  #viewElement;

  constructor(viewElement) {
    super();

    this.#viewElement = viewElement;
  }
}

export default View;
