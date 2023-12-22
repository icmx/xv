import { isDomWrapperConstructorInit } from '../utils/isDomWrapperConstructorInit';

export class DomWrapper {
  nodes;

  store;

  constructor(init) {
    if (!isDomWrapperConstructorInit(init)) {
      throw new Error('Incorrect DomWrapper constructor init');
    }

    this.nodes = Array.from(init);
    this.store = new Map();
  }

  static extend(plugins) {
    Object.assign(DomWrapper.prototype, ...plugins);
  }
}
