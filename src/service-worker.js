const CACHE_NAME = globalConst.version;

const isCacheable = (request, response) => {
  if (request.url.endsWith('/xkcd/info.0.json')) {
    return false;
  }

  if (response.ok === false || response.status !== 304) {
    return false;
  }

  return true;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      return cache.addAll([
        '/',
        '/apple-touch-icon.png',
        '/favicon.ico',
        '/favicon.svg',
        '/icon-192.png',
        '/icon-512.png',
        '/index.html',
        '/main.js',
        '/manifest.webmanifest',
        '/style.css',
        '/vendors.js',
      ]);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      return keys.map(async (key) => {
        if (key !== CACHE_NAME) {
          return await caches.delete(key);
        }
      });
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const { request } = event;
      const oldResponse = await caches.match(request);

      if (oldResponse) {
        return oldResponse;
      } else {
        const newResponse = await fetch(request);

        if (isCacheable(request, newResponse)) {
          const clone = response.clone();
          const cache = await caches.open(CACHE_NAME);

          cache.put(request, clone);
        }

        return newResponse;
      }
    })()
  );
});
