import { int } from './int';

/**
 * Shorthand to standard `Number.isInteger`, determines is a value is
 * an integer number.
 * @param {?} value
 * @returns {boolean}
 */
export const isInt = (value) => {
  return Number.isInteger(int(value));
};
