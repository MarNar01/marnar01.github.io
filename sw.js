const CACHE_NAME = "appartement-cache-v1";
const URLS_TO_CACHE = [
  "appartement.html",
  "manifest.webmanifest"
  // Voeg hier later evt. icon-192.png, icon-512.png, css/js-bestanden toe
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // eerst uit cache, anders netwerk
      return response || fetch(event.request);
    })
  );
});
