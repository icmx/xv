/**
 * Returns a random integer number between `min` and `max`, inclusively.
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const random = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Shorthand to standard `Number.parseInt(string, 10)`, converts a
 * string to an integer.
 * @param {string} string
 * @returns {number}
 */
export const int = (string) => Number.parseInt(string, 10);

/**
 * Shorthand to standard Array.from and forEach.
 * @param {Iterable} iterable
 * @param {function} callback
 */
export const each = (iterable, callback) => {
  Array.from(iterable).forEach(callback);
};

export default { random, int, each };
