import { isArray } from './isArray';

/**
 * Determine if value is an Array and it's empty.
 * @param {?} value
 * @returns {boolean}
 */
export const isEmptyArray = (value) => {
  return isArray(value) && value.length === 0;
};
