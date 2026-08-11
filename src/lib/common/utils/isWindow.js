/**
 * Determine if value is a current Window instance.
 * @param {?} value
 * @returns {boolean}
 */
export const isWindow = (value) => {
  return value === window;
};
