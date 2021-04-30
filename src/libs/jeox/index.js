import * as core from './core';
import * as features from './features';

core.extend(features.attributes, features.contents, features.events);

export const { $, extend } = core;
