import { Controller } from './core';
import { aboutFeature, themeFeature, xkcdFeature } from './features';

export const app = new Controller({
  controllers: [aboutFeature, themeFeature, xkcdFeature],
});
