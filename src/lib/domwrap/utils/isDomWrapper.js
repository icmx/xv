import { DomWrapper } from '../core/DomWrapper';

/**
 * Determine if value is a DomWrapper instance.
 * @param {?} value
 * @returns {boolean}
 */
export const isDomWrapper = (value) => {
  return value instanceof DomWrapper;
};
