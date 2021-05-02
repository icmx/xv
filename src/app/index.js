import Core from './core';
import Features from './features';

const App = new Core.Controller({
  childControllers: [Features.comics, Features.theme],
});

export default App;
