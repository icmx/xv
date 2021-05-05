import re from './re';

/**
 * Determine if value is actually a character repetition, done in
 * number of times or more (1 is default).
 * @param {string} value
 * @param {string} character
 * @param {number} count
 * @returns {boolean}
 */
const isRepeated = (value, character, count = 1) => {
  const pattern = re`^\\${character}{${count},}$`;
  return pattern.test(value);
};

export default isRepeated;
