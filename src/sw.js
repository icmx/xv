const CACHE_NAME = 'v1';

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
        '/sw.js',
        '/vendors.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then((response) => {
          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return response;
        });
      }
    })
  );
});
