import Core from './core';
import Features from './features';

const App = new Core.Controller({
  childControllers: [Features.xkcd, Features.theme],
});

export default App;
