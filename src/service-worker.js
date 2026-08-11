/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const worker = self;

const VERSION = '__SW_VERSION__';
const PRECACHE_URLS = __SW_PRECACHE_URLS__;
const SHELL_URL = '/index.html';

const SHELL_CACHE = `xv-shell-${VERSION}`;
const CONTENT_CACHE = 'xv-content';

const CONTENT_LIMIT = 300;

const isShellAsset = (url) =>
  url.origin === worker.location.origin &&
  PRECACHE_URLS.includes(url.pathname);

const isComicData = (url) =>
  url.origin === worker.location.origin &&
  /^\/api\/comics\/xkcd\/\d+\/info\.0\.json$/.test(url.pathname);

const isComicImage = (url) =>
  url.origin === worker.location.origin &&
  url.pathname.startsWith('/files/comics/xkcd/');

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response.ok) {
    await cache.put(request, response.clone());
  }

  return response;
};

const shellFirst = async (request) => {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(SHELL_URL);

  return cached ?? (await fetch(request));
};

const trimCache = async (cacheName, limit) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length <= limit) {
    return;
  }

  await Promise.all(
    keys.slice(0, keys.length - limit).map((key) => cache.delete(key)),
  );
};

worker.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);

      await cache.addAll(PRECACHE_URLS);
      await worker.skipWaiting();
    })(),
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== CONTENT_CACHE)
          .map((key) => caches.delete(key)),
      );

      await worker.clients.claim();
    })(),
  );
});

worker.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(shellFirst(request));
    return;
  }

  if (isShellAsset(url)) {
    event.respondWith(cacheFirst(request, SHELL_CACHE));
    return;
  }

  if (isComicData(url) || isComicImage(url)) {
    event.respondWith(cacheFirst(request, CONTENT_CACHE));
    event.waitUntil(trimCache(CONTENT_CACHE, CONTENT_LIMIT));
    return;
  }
});
