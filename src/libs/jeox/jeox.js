import { isFunction } from './utils/isFunciton';

/**
 * Jeox - jQuery-like elements operations.
 * Proxy class for one or more connected DOM nodes.
 */
export class Jeox {
  /**
   * @private
   * @type NodeListOf<any>
   */
  #elements = [];

  static #domParser = new DOMParser();

  /**
   * Creates a new Jeox instance by using a list of DOM nodes.
   * @param {NodeListOf<Element>} nodes - nodes to be proxied
   */
  constructor(nodes) {
    this.#elements = [...nodes];
  }

  get #firstElement() {
    return this.#elements[0];
  }

  /**
   * Perform a callback function for each element in a current
   * instance.
   * @param {function} callbackfn
   * @chainable
   */
  each(callbackfn) {
    if (!callbackfn || !isFunction(callbackfn)) {
      return;
    }

    this.#elements.forEach(callbackfn);

    return this;
  }

  /**
   * Set attribute to value or remove attribute if value is `null`.
   * @param {string} name - attribute name
   * @param {string|null} value - attribute value or `null` to remove
   * @chainable
   */
  attr(name, value) {
    if (value === null) {
      this.each((element) => element.removeAttribute(name));
    } else {
      this.each((element) => element.setAttribute(name, value));
    }

    return this;
  }

  /**
   * Add a class name.
   * @param {string} name - class name to add
   * @chainable
   */
  addClass(name) {
    this.each((element) => element.classList.add(name));

    return this;
  }

  /**
   * Determine if first element in an instance has a class with name
   * specified.
   * @param {string} name - class name
   * @returns boolean
   */
  hasClass(name) {
    return this.#firstElement.classList.contains(name);
  }

  /**
   * Remove a class name.
   * @param {string} name - class name to remove
   * @chainable
   */
  removeClass(name) {
    this.each((element) => element.classList.remove(name));

    return this;
  }

  /**
   * Toggle a class name.
   * @param {string} name - class name
   * @param {boolean} state - force class state: true to add, false to
   * remove
   * @chainable
   */
  toggleClass(name, state) {
    this.each((element) => element.classList.toggle(name, state));

    return this;
  }

  /**
   * Set new class list to all elements in an instance or get class list
   * value of the first one.
   * @param {string[]} classList - a new classList to set
   * @returns
   */
  classList(classList) {
    if (classList === undefined) {
      return [...this.#firstElement.classList];
    } else {
      this.each((element) => (element.className = classList.join(' ')));
      return this;
    }
  }

  /**
   * Set a textContent property.
   * @param {string} string - text content to set
   * @chainable
   */
  text(string) {
    this.each((element) => (element.textContent = string));

    return this;
  }

  /**
   * Append nodes as children.
   * @param {Node[]} nodes - nodes to append
   * @chainable
   */
  append(nodes) {
    this.each((element) => element.append(...nodes));

    return this;
  }

  /**
   * Remove any children.
   * @chainable
   */
  empty() {
    this.each((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    return this;
  }

  /**
   * Parse and insert an HTML inside.
   * @param {string} htmlString - HTML in a string form to parse and
   * set inside
   * @see {@link empty}
   * @see {@link append}
   * @chainable
   */
  html(htmlString) {
    const document = Jeox.#domParser.parseFromString(
      htmlString,
      'text/html'
    );

    const nodes = document.body.childNodes;

    this.empty();
    this.append(nodes);

    return this;
  }

  /**
   * Add event listener.
   * @param {string} type - event type
   * @param {function} listener - callback function
   * @param {boolean|AddEventListenerOptions} options
   * @chainable
   */
  on(type, listener, options) {
    this.each((element) =>
      element.addEventListener(type, listener, options)
    );

    return this;
  }

  /**
   * Return first element in a Jeox.
   */
  first() {
    return this.#elements[0];
  }

  /**
   * Shorthand to standard `getBoundingClientRect` for first element in
   * an instance.
   */
  rect() {
    return this.first().getBoundingClientRect();
  }

  /**
   * Returns an object with `width` and `height` properties which
   * corresponds image element's `naturalWidth` and `naturalHeight`
   */
  imageSize() {
    const first = this.first();
    return { width: first.naturalWidth, height: first.naturalHeight };
  }
}
