const CACHE_NAME = "elk-landing-v1";

const STATIC_ASSETS = [
    "index.html",
    "manifest.json",
    "favicon.png",
    "icon-192.png",
    "icon-512.png",
    "apple-touch-icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(response => response)
            .catch(() => caches.match(event.request).then(cached => cached || caches.match("index.html")))
    );
});
