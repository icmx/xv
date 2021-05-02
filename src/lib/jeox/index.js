import Core from './core';
import Features from './features';

Core.extend(Features.attributes, Features.contents, Features.events);

const { $, extend } = Core;

export { extend };
export default $;
