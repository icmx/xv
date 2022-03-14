import Core from './core';
import Features from './features';

Core.extend(
  Features.animation,
  Features.attributes,
  Features.contents,
  Features.display,
  Features.events,
  Features.style
);

const { $, extend } = Core;

export { extend };
export default $;
