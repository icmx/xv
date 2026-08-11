/**
 * Determine if value is a MediaQueryList instance.
 * @param {?} value
 * @returns {boolean}
 */
export const isMediaQueryList = (value) => {
  return value instanceof MediaQueryList;
};
