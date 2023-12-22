import { r } from '#/lib/common';

/**
 * Determine if value is actually a character repetition, done in
 * number of times or more (1 is default).
 * @param {string} value
 * @param {string} character
 * @param {number} count
 * @returns {boolean}
 */
export const isRepeated = (value, character, count = 1) => {
  const pattern = r`^\\${character}{${count},}$`;
  return pattern.test(value);
};
