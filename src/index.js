import { app } from '#/app';
import '#/index.css';

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js');
});

app.start();
