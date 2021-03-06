import isJeox from '../utils/isJeox';
import isNode from '../utils/isNode';
import isString from '../utils/isString';
import Jeox from './Jeox';

const $ = (value, context = window.document) => {
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

export default $;
