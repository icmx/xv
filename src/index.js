import comics from '~/api/comics';
import App from '~/app';

import '~/index.css';

const app = new App.Controller(
  new App.Model(comics),
  new App.View(document.querySelector('.xv-app'))
);

app.start();
