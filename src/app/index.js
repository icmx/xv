import Core from './core';
import Features from './features';

const App = new Core.Controller({
  childControllers: [Features.about, Features.theme, Features.xkcd],
});

export default App;
