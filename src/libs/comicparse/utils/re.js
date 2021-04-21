/**
 * Shorthand to standard RegExp contructor, builds a regular expression
 * instance, but based on template string.
 * @param {string[]} strings
 * @param  {...string} keys
 * @returns RegExp
 */
export const re = (strings, ...keys) => {
  const pattern = keys
    .map((value, index) => strings[index] + value)
    .join('')
    .concat(strings[strings.length - 1]);

  return new RegExp(pattern);
};
