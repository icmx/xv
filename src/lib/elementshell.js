const isElementShell = (value) => value instanceof ElementShell;
const isElement = (value) => value.nodeType || value === window;
const isString = (value) => typeof value === 'string';
const isFunction = (value) => typeof value === 'function';
const domParser = new DOMParser();

export class ElementShell {
  elements = [];

  constructor(...elements) {
    this.elements = elements;
  }

  /**
   * Performs a callback for each element in current shell.
   * @param {Function} callbackfn
   */
  each(callbackfn) {
    if (!callbackfn || !isFunction(callbackfn)) return;

    this.elements.forEach(callbackfn);

    return this;
  }

  /**
   * Shorthand to standard `setAttribute`, or `removeAttribute` if
   * value is `null`.
   * @param {string} name - attribute name
   * @param {string|null} value - attribute value or `null` to remove
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
   * Shorthand to standard `classList.toggle`.
   * @param {string} name - class name
   * @param {boolean} state - force class state, true to add, false to
   * remove
   */
  toggleClass(name, state) {
    this.each((element) => element.classList.toggle(name, state));

    return this;
  }

  /**
   * Shorthand to standard `classList.add`.
   * @param {string} name - class name to add
   */
  addClass(name) {
    this.each((element) => element.classList.add(name));

    return this;
  }

  /**
   * Shorthand to standard `classList.remove`.
   * @param {string} name - class name to remove
   */
  removeClass(name) {
    this.each((element) => element.classList.remove(name));

    return this;
  }

  /**
   * Shorthand to standard textContent property, done as a function.
   * @param {string} string - text content to set insode `element`
   */
  text(string) {
    this.each((element) => (element.textContent = string));

    return this;
  }

  /**
   * Shorthand to standard nodes `append`.
   * @param {Node[]} nodes - contents to append inside `element`
   */
  append(nodes) {
    this.each((element) => element.append(...nodes));

    return this;
  }

  /**
   * Shorthand to standard `removeChild` in a loop to remove all the
   * `element` children.
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
   * Parse and insert an HTML string inside.
   * @param {string} htmlString - HTML string to parse and set inside
   *  an `element`
   * @see {@link empty}
   * @see {@link append}
   */
  html(htmlString) {
    const document = domParser.parseFromString(htmlString, 'text/html');
    const nodes = document.body.childNodes;

    this.empty();
    this.append(nodes);

    return this;
  }

  /**
   * Shorthand to standard addEventListener
   * @param {string} type - event type
   * @param {function} listener - callback function
   * @param {boolean|AddEventListenerOptions} options
   */
  on(type, listener, options) {
    this.each((element) => element.addEventListener(type, listener, options));

    return this;
  }

  /**
   * Returns first element in a shell.
   */
  first() {
    return this.elements[0];
  }

  /**
   * Shorthand to standard `getBoundingClientRect` for first element in
   * a shell.
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

export const $ = (value, context = window.document) => {
  if (!value) {
    return new ElementShell();
  }

  if (isElementShell(value)) {
    return value;
  }

  if (isElement(value)) {
    return new ElementShell(value);
  }

  if (isString(value)) {
    if (isElementShell(context)) {
      return new ElementShell(...window.document.querySelectorAll(value));
    } else {
      return new ElementShell(...context.querySelectorAll(value));
    }
  }
};

export default $;
