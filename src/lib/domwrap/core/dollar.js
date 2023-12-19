import { isNode, isString } from '#/lib/common';
import { isDOMWrapper } from '../utils/isDOMWrapper';
import { DOMWrapper } from './DOMWrapper';

export const $ = (value, context = document) => {
  if (isDOMWrapper(value)) {
    return value;
  }

  if (isNode(value)) {
    return new DOMWrapper([value]);
  }

  if (isString(value)) {
    if (isDOMWrapper(context)) {
      return new DOMWrapper(context.child().querySelectorAll(value));
    }

    if (isNode(context)) {
      return new DOMWrapper(context.querySelectorAll(value));
    }

    throw new Error(`Incorrect context: ${context}`);
  }

  throw new Error(`Incorrect value: ${value}`);
};
