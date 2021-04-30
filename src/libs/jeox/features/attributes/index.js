export const attributes = {
  attr(name, value) {
    const isNameOnly = name && value === undefined;
    const isValueNull = value === null;

    if (isNameOnly) {
      return this.child().getAttribute(name);
    }

    if (isValueNull) {
      this.forEach((element) => element.removeAttribute(name));
    } else {
      this.forEach((element) => element.setAttribute(name, value));
    }

    return this;
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
    const isUndefinedNames = names === undefined;
    const isNullNames = names === null;

    if (isUndefinedNames) {
      return [...this.child().classList];
    }

    if (isNullNames) {
      this.forEach((element) => (element.className = ''));
    } else {
      this.forEach((element) => (element.className = names.join(' ')));
    }

    return this;
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
