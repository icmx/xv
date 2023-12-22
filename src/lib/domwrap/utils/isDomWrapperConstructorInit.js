import { isArray, isHTMLCollection, isNodeList } from '#/lib/common';

/**
 * Returns true if value is compatible with DomWrapper constructor init
 * value, i.e. generic array, HTMLCollection or NodeList
 *
 * @param {?} value
 * @returns {boolean}
 */
export const isDomWrapperConstructorInit = (value) => {
  const isCorrectInstance =
    isArray(value) || isHTMLCollection(value) || isNodeList(value);

  if (!isCorrectInstance) {
    return false;
  }

  return value.length > 0;
};
