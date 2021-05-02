/**
 * Determine if value is a DOM node.
 * @param {?} value
 * @returns boolean
 */
const isNode = (value) => {
  return value.nodeType || value === window;
};

export default isNode;
