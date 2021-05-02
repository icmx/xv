/**
 * Shorthand to standard `Number.parseInt(string, 10)`, converts a
 * value to an integer number.
 * @param {?} value
 * @returns {number}
 */
const int = (string) => {
  return Number.parseInt(string, 10);
};

export default int;
