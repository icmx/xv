export const events = {
  on(type, listener, options) {
    this.forEach((element) =>
      element.addEventListener(type, listener, options)
    );

    return this;
  },

  off(type, listener, options) {
    this.forEach((element) =>
      element.removeEventListener(type, listener, options)
    );

    return this;
  },
};
