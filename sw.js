// Service Worker: офлайн-кэш и быстрые повторные загрузки
// Версия кэша меняйте при изменениях файлов, чтобы актуализировать кэш
const CACHE_VERSION = 'v1.9.10';
const CACHE_NAME = `calm-cache-${CACHE_VERSION}`;
const OFFLINE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// Стратегия: network-first для навигации, cache-first для статических ассетов
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Для запросов навигации — пытаемся сеть, затем кэш, затем index.html
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, net.clone());
        return net;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || caches.match('./index.html');
      }
    })());
    return;
  }

  // Для статических ассетов — cache-first
  if (OFFLINE_ASSETS.some(p => url.pathname.endsWith(p.replace('./','/')))) {
    event.respondWith(caches.match(req).then(c => c || fetch(req)));
    return;
  }

  // Для остальных — попытка сети, fallback к кэшу, если есть
  event.respondWith((async () => {
    try {
      return await fetch(req);
    } catch (e) {
      const cached = await caches.match(req);
      return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});


