import { isJeox, isNode, isString } from '../utils';
import { Jeox } from './Jeox';

export const $ = (value, context = window.document) => {
  if (isJeox(value)) {
    return value;
  }

  if (isNode(value)) {
    return new Jeox([value]);
  }

  if (isString(value)) {
    if (isJeox(context)) {
      return new Jeox(context.child().querySelectorAll(value));
    }

    if (isNode(context)) {
      return new Jeox(context.querySelectorAll(value));
    }

    throw new Error(`Incorrect context: ${context}`);
  }

  throw new Error(`Incorrect value: ${value}`);
};
