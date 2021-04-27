import comics from '~/api/comics';

import Core from './core';
import Features from './features';

const app = new Core.Controller({
  childControllers: [
    new Features.Comics.Controller({
      model: new Features.Comics.Model(comics),
      view: new Features.Comics.View(document.querySelector('.xv-app')),
    }),

    new Features.Theme.Controller({
      model: new Features.Theme.Model(),
      view: new Features.Theme.View(document.querySelector('.xv-app')),
    }),
  ],
});

export default app;
