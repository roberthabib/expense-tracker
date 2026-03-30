const CACHE = 'expense-tracker-v2';
const SHELL = ['/', '/index.html', '/manifest.json', '/android-chrome-192x192.png', '/android-chrome-512x512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Never cache API calls — always go to network
  if (e.request.url.includes('/api/') || e.request.url.includes('script.google.com')) {
    return;
  }
  // Always fetch fresh HTML so updates are picked up immediately
  if (e.request.destination === 'document') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // Cache first for images/icons
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
