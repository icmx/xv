import { extend } from './core';
import {
  animation,
  attributes,
  contents,
  display,
  events,
  style,
} from './features';

extend(animation, attributes, contents, display, events, style);

export { $ as default, extend } from './core';
