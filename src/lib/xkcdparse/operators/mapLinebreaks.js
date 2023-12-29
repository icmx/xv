/**
 * Maps paragraphs (HTML `<p>` tags) from line breaks.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapLinebreaks = (source) => {
  return source
    .split(/\n+/g)
    .map((line) => `<p>${line.trim()}</p>`)
    .join('');
};
