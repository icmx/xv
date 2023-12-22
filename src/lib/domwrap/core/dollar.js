import { isNode, isString } from '#/lib/common';
import { isDomWrapper } from '../utils/isDomWrapper';
import { DomWrapper } from './DomWrapper';

export const $ = (value, context = document) => {
  if (isDomWrapper(value)) {
    return value;
  }

  if (isNode(value)) {
    return new DomWrapper([value]);
  }

  if (isString(value)) {
    if (isDomWrapper(context)) {
      return new DomWrapper(
        context.nodes.at(0).querySelectorAll(value)
      );
    }

    if (isNode(context)) {
      return new DomWrapper(context.querySelectorAll(value));
    }

    throw new Error('Incorrect DomWrapper context parameter');
  }

  throw new Error('Incorrect DomWrapper value parameter');
};
