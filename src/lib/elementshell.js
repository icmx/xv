const isElementShell = (value) => value instanceof ElementShell;
const isElement = (value) => value.nodeType || value === window;
const isString = (value) => typeof value === 'string';

export class ElementShell {
  elements = [];

  constructor(...elements) {
    this.elements = elements;
  }

  get length() {
    return this.elements.length;
  }

  each(callbackfn) {
    if (!callbackfn || !isFunction(callbackfn)) return;

    this.elements.forEach(callbackfn);
    return this;
  }

  attr(name, value) {
    if (value === null) {
      this.each((element) => element.removeAttribute(name));
    } else {
      this.each((element) => element.setAttribute(name, value));
    }

    return this;
  }

  toggleClass(name, state) {
    this.each((element) => element.classList.toggle(name, state));
    return this;
  }

  addClass(name) {
    this.each((element) => element.classList.add(name));
    return this;
  }

  removeClass(name) {
    this.each((element) => element.classList.remove(name));
    return this;
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
    return new ElementShell(...context.querySelectorAll(value));
  }
};

export default $;
