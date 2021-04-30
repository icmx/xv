const parser = new DOMParser();

export const contents = {
  text(value) {
    this.forEach((element) => (element.textContent = value));

    return this;
  },

  html(value) {
    const document = parser.parseFromString(value, 'text/html');
    const nodes = document.body.childNodes;

    this.empty();
    this.append(nodes);

    return this;
  },

  append(nodes) {
    this.forEach((element) => element.append(...nodes));

    return this;
  },

  empty() {
    this.forEach((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    return this;
  },
};
