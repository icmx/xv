const CACHE_NAME = 'v0.2.8';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
        '/apple-touch-icon.png',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
        '/favicon.ico',
        '/index.html',
        '/main.js',
        '/manifest.webmanifest',
        '/style.css',
        '/vendors.js',
      ]);
    })
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
    caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then((response) => {
          if (!event.request.url.endsWith('/xkcd/info.0.json')) {
            const clone = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }

          return response;
        });
      }
    })
  );
});
