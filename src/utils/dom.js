const domParser = new DOMParser();

/**
 * Shorthand to standart `querySelector`, returns the first element
 * that is a descendant of node that matches selector.
 * @param {string} selector - query selector string
 * @param {HTMLElement} [parent=window.document] - parent element to
 *  query, document root if omitted
 */
export const q = (selector, parent = window.document) => {
  return parent.querySelector(selector);
};

export const qa = (selector, parent = window.document) => {
  return parent.querySelectorAll(selector);
};

/**
 * Shorthand to standard `setAttribute`, or `removeAttribute` if value
 * is `null`
 * @param {HTMLElement} element
 * @param {string} name - attribute name
 * @param {string|null} value - attribute value or `null` to remove
 */
export const attr = (element, name, value) => {
  if (value === null) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value);
  }
};

/**
 * Shorthand to standard `classList.toggle`.
 * @param {HTMLElement} element
 * @param {string} name - class name
 * @param {boolean} state - force class state, true to add, false to
 * remove
 */
export const toggleClass = (element, name, state) => {
  element.classList.toggle(name, state);
};

/**
 * Shorthand to standard `classList.add`.
 * @param {*} element
 * @param {*} name - class name to add
 */
export const addClass = (element, name) => {
  element.classList.add(name);
};

/**
 * Shorthand to standard `classList.remove`
 * @param {*} element
 * @param {*} name - class name to remove
 */
export const removeClass = (element, name) => {
  element.classList.remove(name);
};

/**
 * Shorthand to standard textContent property, done as a function.
 * @param {HTMLElement} element
 * @param {string} string - text content to set insode `element`
 */
export const text = (element, string) => {
  element.textContent = string;
};

/**
 * Shorthand to standard nodes `append`.
 * @param {HTMLElement} element
 * @param {Node[]} nodes - contents to append inside `element`
 */
export const append = (element, nodes) => {
  element.append(...nodes);
};

/**
 * Shorthand to standard `removeChild` in a loop to remove all the
 * `element` children.
 * @param {HTMLElement} element
 */
export const empty = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Shorthand to `empty`, then `append`.
 * @param {HTMLElement} element
 * @param {string} htmlString - HTML string to parse and set inside an
 * `element`
 * @see {@link empty}
 * @see {@link append}
 */
export const html = (element, htmlString) => {
  const document = domParser.parseFromString(htmlString, 'text/html');
  const nodes = document.body.childNodes;

  empty(element);
  append(element, nodes);
};

/**
 * Shorthand to standard addEventListener
 * @param {HTMLElement} element
 * @param {string} type
 * @param {function} listener
 * @param {any} options
 */
export const on = (element, type, listener, options) => {
  element.addEventListener(type, listener, options);
};

export default {
  q,
  qa,
  attr,
  toggleClass,
  addClass,
  removeClass,
  text,
  append,
  empty,
  html,
  on,
};
