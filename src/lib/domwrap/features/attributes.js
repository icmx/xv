export const attributes = {
  attr(name, value) {
    const isGetting = name && value === undefined;
    const isSetting = name && value;
    const isRemoving = value === null;

    if (isGetting) {
      return this.nodes.at(0).getAttribute(name);
    }

    if (isSetting) {
      this.nodes.forEach((element) => {
        element.setAttribute(name, value);
      });

      return this;
    }

    if (isRemoving) {
      this.nodes.forEach((element) => {
        element.removeAttribute(name);
      });

      return this;
    }
  },

  addClass(name) {
    this.nodes.forEach((element) => {
      element.classList.add(name);
    });

    return this;
  },

  hasClass(name) {
    return this.nodes.at(0).classList.contains(name);
  },

  removeClass(name) {
    this.nodes.forEach((element) => {
      element.classList.remove(name);
    });

    return this;
  },

  toggleClass(name, state) {
    this.nodes.forEach((element) => {
      element.classList.toggle(name, state);
    });

    return this;
  },

  classList(names) {
    const isGetting = names === undefined;
    const isSetting = names ? true : false;
    const isRemoving = names === null;

    if (isGetting) {
      return [...this.nodes.at(0).classList];
    }

    if (isSetting) {
      this.nodes.forEach((element) => {
        element.className = names.join(' ');
      });

      return this;
    }

    if (isRemoving) {
      this.nodes.forEach((element) => {
        element.className = '';
      });

      return this;
    }
  },

  disable() {
    this.attr('disabled', 'disabled');
  },

  enable() {
    this.attr('disabled', null);
  },

  rect() {
    return this.nodes.at(0).getBoundingClientRect();
  },

  imageSize() {
    const child = this.nodes.at(0);

    return {
      width: child.naturalWidth,
      height: child.naturalHeight,
    };
  },
};
