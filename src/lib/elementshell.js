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

  text(string) {
    this.each((element) => (element.textContent = string));

    return this;
  }

  append(nodes) {
    this.each((element) => element.append(...nodes));

    return this;
  }

  empty() {
    this.each((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    return this;
  }

  html(htmlString) {
    const document = domParser.parseFromString(htmlString, 'text/html');
    const nodes = document.body.childNodes;

    this.empty();
    this.append(nodes);

    return this;
  }

  on(type, listener, options) {
    this.each((element) => element.addEventListener(type, listener, options));

    return this;
  }

  first() {
    return this.elements[0];
  }

  rect() {
    return this.first().getBoundingClientRect();
  }

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
