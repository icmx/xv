import Core from './core';
import Features from './features';

const app = new Core.Controller({
  childControllers: [Features.Comics, Features.Theme],
});

export default app;
