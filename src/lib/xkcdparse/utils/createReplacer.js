/**
 * Trimmed text processing callback.
 *
 * @callback onTrimmedCallback
 * @param {string} trimmed
 * @returns {string}
 */

/**
 * Create a replacer function to trim left and right parts (like
 * brackets or tags).
 *
 * @param {Object} options
 * @param {string} options.startPattern
 * @param {string} options.endPattern
 * @param {onTrimmedCallback} options.onTrimmed
 * @returns {string}
 */
export const createReplacer = ({
  startPattern,
  endPattern,
  onTrimmed,
}) => {
  return (match) => {
    const startRegExp = new RegExp(`^(${startPattern})+ *?`, 'g');
    const endRegExp = new RegExp(` *?(${endPattern})+$`, 'g');

    const trimmed = match
      .replaceAll(startRegExp, '')
      .replaceAll(endRegExp, '');

    return onTrimmed(trimmed);
  };
};
