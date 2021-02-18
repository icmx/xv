const domParser = new DOMParser();

/**
 * Shorthand to standart `querySelector`, returns the first element
 * that is a descendant of node that matches selector.
 */
export const q = (selector, parent = window.document) => {
  return parent.querySelector(selector);
};

/**
 * Shorthand to standard `setAttribute`, or `removeAttribute` if value
 * is omitted.
 */
export const attr = (element) => (name, value) => {
  if (!value) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value);
  }
};

/**
 * Shorthand to standard `classList.toggle`.
 */
export const toggleClass = (element) => (token, force) => {
  element.classList.toggle(token, force);
};

/**
 * Shorthand to standard textContent property, done as a function.
 */
export const text = (element) => (string) => {
  element.textContent = string;
};

/**
 * Shorthand to standard nodes `append`.
 */
export const append = (element) => (nodes) => {
  element.append(...nodes);
};

/**
 * Shorthand to standard `removeChild` in a loop to remove all the
 * `element` children.
 */
export const empty = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Shorthand to `empty`, then `append`.
 * @see {@link empty}
 * @see {@link append}
 */
export const html = (element) => (htmlString) => {
  const document = domParser.parseFromString(htmlString, 'text/html');
  const nodes = document.body.childNodes;

  empty(element);
  append(element)(nodes);
};

export default { q, attr, toggleClass, text, append, empty, html };
