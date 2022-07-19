export const attributes = {
  attr(name, value) {
    const isGetting = name && value === undefined;
    const isSetting = name && value;
    const isRemoving = value === null;

    if (isGetting) {
      return this.child().getAttribute(name);
    }

    if (isSetting) {
      this.forEach((element) => element.setAttribute(name, value));

      return this;
    }

    if (isRemoving) {
      this.forEach((element) => element.removeAttribute(name));

      return this;
    }
  },

  addClass(name) {
    this.forEach((element) => element.classList.add(name));

    return this;
  },

  hasClass(name) {
    return this.child().classList.contains(name);
  },

  removeClass(name) {
    this.forEach((element) => element.classList.remove(name));

    return this;
  },

  toggleClass(name, state) {
    this.forEach((element) => element.classList.toggle(name, state));

    return this;
  },

  classList(names) {
    const isGetting = names === undefined;
    const isSetting = names ? true : false;
    const isRemoving = names === null;

    if (isGetting) {
      return [...this.child().classList];
    }

    if (isSetting) {
      this.forEach((element) => (element.className = names.join(' ')));

      return this;
    }

    if (isRemoving) {
      this.forEach((element) => (element.className = ''));

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
    return this.child().getBoundingClientRect();
  },

  imageSize() {
    const child = this.child();

    return {
      width: child.naturalWidth,
      height: child.naturalHeight,
    };
  },
};
