/**
 * Escape HTML sequences, i.e. replace tags markers (`<`, `>`) to safe
 * entities (`&lt;`, `&gt;`).
 *
 * @param {string} source
 * @returns {string}
 */
export const escape = (source) => {
  return source.replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
};
