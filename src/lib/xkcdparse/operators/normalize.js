import { isString } from '#/lib/common';

/**
 * Handle initial source string and process extra spacing.
 *
 * @param {string} source
 * @returns {string}
 */
export const normalize = (source) => {
  if (!source || !isString(source)) {
    return '';
  }

  return source.replace(/ +/g, ' ').trim();
};
