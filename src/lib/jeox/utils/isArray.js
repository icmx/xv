/**
 * Determine if value is an Array.
 * @param {?} value
 * @returns {boolean}
 */
const isArray = (value) => {
  return typeof value.length === 'number';
};

export default isArray;
