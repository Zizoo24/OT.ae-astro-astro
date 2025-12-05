const CACHE_NAME = 'onlinetranslation-v123';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles/porto-desktop.css',
  '/styles/sticky-mobile.css',
  '/styles/mobile-ios.css',
  '/styles/mobile-android.css',
  '/styles/desktop-macos.css',
  '/styles/dark-mode.css',
  '/styles/subsection-menu.css',
  '/styles/mobile-action-bar.css',
  '/styles/visibility-fixes.css',
  '/scripts/main.js',
  '/scripts/navigation.js',
  '/scripts/form-handler.js',
  '/scripts/os-detect.js',
  '/scripts/search-index.js',
  '/scripts/subsection-menu.js',
  '/scripts/image-optimization.js',
  '/scripts/cookie-consent.js',
  '/scripts/analytics.js',
  '/sitemap.xml',
  '/manifest.webmanifest',
  '/images/icons/favicon.svg',
  '/images/icons/favicon-32.png',
  '/images/logo/brand/emblem-256.png',
  '/images/logo/brand/emblem-64.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache.map(url => {
          if (url.startsWith('http')) {
            return new Request(url, { mode: 'cors' });
          }
          return url;
        })).catch(err => {
          console.warn('Cache addAll failed:', err);
        });
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(function() {
          // Offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
