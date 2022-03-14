const style = {
  style() {
    return getComputedStyle(this.child());
  },

  styleProperty(key) {
    return this.style().getPropertyValue(key).trim();
  },

  styleVar(key) {
    return this.styleProperty(`--${key}`);
  },
};

export default style;
