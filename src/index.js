import { app } from '~/app';

import '~/index.css';

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

app.start();
