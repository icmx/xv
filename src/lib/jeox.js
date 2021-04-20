/**
 * Determine if value is a Jeox instance.
 * @param {?} value
 * @returns boolean
 */
const isJeox = (value) => {
  return value instanceof Jeox;
};

/**
 * Determine if value is a DOM node.
 * @param {?} value
 * @returns boolean
 */
const isNode = (value) => {
  return value.nodeType || value === window;
};

/**
 * Determine if value is a string.
 * @param {?} value
 * @returns boolean
 */
const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Determine if value is a function.
 * @param {?} value
 * @returns boolean
 */
const isFunction = (value) => {
  return typeof value === 'function';
};

const domParser = new DOMParser();

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

  /**
   * Creates a new Jeox instance by using a list of DOM nodes.
   * @param {NodeListOf<Element>} nodes - nodes to be proxied
   */
  constructor(nodes) {
    this.#elements = [...nodes];
  }

  /**
   * Perform a callback function for each element in a current shell.
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
   * Add a class name.
   * @param {string} name - class name to add
   * @chainable
   */
  addClass(name) {
    this.each((element) => element.classList.add(name));

    return this;
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
    const document = domParser.parseFromString(htmlString, 'text/html');
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

/**
 * Gets a Jeox instance by using a DOM node, nodes list, query selector
 * or existing Jeox instance.
 * @param {?} value - DOM node, nodes list, query selector or existing
 * Jeox instance
 * @param {Node} context - Optional context for query selector
 * @returns Jeox
 */
export const $ = (value, context = window.document) => {
  if (!value) {
    return new Jeox();
  }

  if (isJeox(value)) {
    return value;
  }

  if (isNode(value)) {
    return new Jeox([value]);
  }

  if (isString(value)) {
    if (isJeox(context)) {
      return new Jeox(window.document.querySelectorAll(value));
    } else {
      return new Jeox(context.querySelectorAll(value));
    }
  }
};

export default $;
