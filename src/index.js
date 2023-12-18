import {
  AboutController,
  AboutView,
  Controller,
  ThemeController,
  ThemeModel,
  ThemeView,
  XkcdApi,
  XkcdController,
  XkcdModel,
  XkcdView,
} from './app';
import $ from './lib/jeox';
import './index.css';

const target = $('.xv-app');

const aboutFeature = new AboutController({
  view: new AboutView(target),
});

const themeFeature = new ThemeController({
  model: new ThemeModel(),
  view: new ThemeView(target),
});

const xkcdFeature = new XkcdController({
  model: new XkcdModel(new XkcdApi('/api/comics/xkcd')),
  view: new XkcdView(target),
});

export const app = new Controller({
  controllers: [aboutFeature, themeFeature, xkcdFeature],
});

$(window).on('load', () => {
  navigator.serviceWorker.register('/service-worker.js');
});

app.start();
