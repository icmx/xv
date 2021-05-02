import int from './int';

/**
 * Shorthand to standard `Number.isInteger`, determines is a value is
 * an integer number.
 * @param {?} value
 * @returns {boolean}
 */
const isInt = (value) => {
  return Number.isInteger(int(value));
};

export default isInt;
