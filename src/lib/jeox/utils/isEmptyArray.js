import isArray from './isArray';

/**
 * Determine if value is an Array and it's empty.
 * @param {?} value
 * @returns {boolean}
 */
const isEmptyArray = (value) => {
  return isArray(value) && value.length === 0;
};

export default isEmptyArray;
