/**
 * Applies replacement pairs on a string value.
 * @param {string} value
 * @param {object} replacements
 * @param {RegExp} replacements.search
 * @param {string|(match) => string} replacements.repalce
 * @returns {string}
 */
export const applyReplacements = (value, ...replacements) => {
  let result = value;

  replacements.forEach(({ search, replace }) => {
    result = result.replaceAll(search, replace);
  });

  return result;
};
