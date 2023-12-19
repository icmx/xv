import { DOMWrapper } from '../core/DOMWrapper';

/**
 * Determine if value is a DOMWrapper instance.
 * @param {?} value
 * @returns {boolean}
 */
export const isDOMWrapper = (value) => {
  return value instanceof DOMWrapper;
};
