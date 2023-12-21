export const style = {
  style() {
    return getComputedStyle(this.nodes.at(0));
  },

  styleProperty(key) {
    return this.style().getPropertyValue(key).trim();
  },

  styleVar(key) {
    return this.styleProperty(`--${key}`);
  },
};
