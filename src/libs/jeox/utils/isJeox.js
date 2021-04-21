import { Jeox } from '../jeox';

/**
 * Determine if value is a Jeox instance.
 * @param {?} value
 * @returns boolean
 */
export const isJeox = (value) => {
  return value instanceof Jeox;
};
