import { DomWrapper } from './core/DomWrapper';
import { animation } from './features/animation';
import { attributes } from './features/attributes';
import { contents } from './features/contents';
import { display } from './features/display';
import { events } from './features/events';
import { style } from './features/style';

DomWrapper.extend([
  animation,
  attributes,
  contents,
  display,
  events,
  style,
]);

// core
export { $ as default } from './core/dollar';
export * from './core/DomWrapper';
