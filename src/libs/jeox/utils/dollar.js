import { Jeox } from '../jeox';
import { isJeox } from './isJeox';
import { isNode } from './isNode';
import { isString } from './isString';

/**
 * Gets a Jeox instance by using a DOM node, nodes list, query selector
 * or existing Jeox instance.
 * @param {?} value - DOM node, nodes list, query selector or existing
 * Jeox instance
 * @param {Node} context - Optional context for query selector
 * @returns Jeox
 */
export const $ = (value, context = window.document) => {
  if (!value) {
    return new Jeox();
  }

  if (isJeox(value)) {
    return value;
  }

  if (isNode(value)) {
    return new Jeox([value]);
  }

  if (isString(value)) {
    if (isJeox(context)) {
      return new Jeox(window.document.querySelectorAll(value));
    } else {
      return new Jeox(context.querySelectorAll(value));
    }
  }
};
