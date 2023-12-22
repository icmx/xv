import { isString } from '#/lib/common';

const parser = new DOMParser();

export const contents = {
  text(value) {
    const isGetting = value === undefined;
    const isSetting = isString(value) ? true : false;
    const isRemoving = value === null;

    if (isGetting) {
      return this.nodes.at(0).textContent;
    }

    if (isSetting) {
      this.nodes.forEach((element) => {
        element.textContent = value;
      });

      return this;
    }

    if (isRemoving) {
      this.nodes.forEach((element) => {
        element.textContent = '';
      });

      return this;
    }
  },

  html(value) {
    const isGetting = value === undefined;
    const isSetting = isString(value) ? true : false;
    const isRemoving = value === null;

    if (isGetting) {
      return this.nodes.at(0).innerHTML;
    }

    if (isSetting) {
      const document = parser.parseFromString(value, 'text/html');
      const nodes = document.body.childNodes;

      this.empty();
      this.append(nodes);

      return this;
    }

    if (isRemoving) {
      this.empty();

      return this;
    }
  },

  append(nodes) {
    this.nodes.forEach((element) => {
      element.append(...nodes);
    });

    return this;
  },

  empty() {
    this.nodes.forEach((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    return this;
  },
};
