/**
 * Returns a random integer number between `min` and `max`, inclusively.
 */
export const random = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Shorthand to standard `Number.parseInt(string, 10)`, converts a
 * string to an integer.
 */
export const int = (string) => Number.parseInt(string, 10);

export default { random, int };
