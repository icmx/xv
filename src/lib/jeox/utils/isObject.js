import { isArray } from './isArray';

/**
 * Determine if value is object.
 * @param {?} value
 * @returns {boolean}
 */
export const isObject = (value) => {
  return !isArray(value) && typeof value === 'object';
};
