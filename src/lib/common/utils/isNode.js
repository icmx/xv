/**
 * Determine if value is a DOM node.
 * @param {?} value
 * @returns {boolean}
 */
export const isNode = (value) => {
  return value instanceof Node;
};
