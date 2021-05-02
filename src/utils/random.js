/**
 * Returns a random integer number between `min` and `max`, inclusively.
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const random = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default random;
