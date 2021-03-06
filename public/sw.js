const version = "v1";

const cacheFiles = [
  "https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed&display=swap",
  "/static/media/D-DIN-Bold.7bb4b1a4.otf",
  "/static/js/2.788ec13d.chunk.js",
  "/static/js/main.88704b41.chunk.js",
  "/static/css/main.2bc93317.chunk.css",
  "/static/media/D-DIN.31d45669.otf",
  "/static/media/bg-1.0da36e21.jpg",
  "/static/media/bg-2.ab56f8ec.jpg",
  "/static/media/bg-3.6d3b42c3.jpg",
  "/static/media/bg-4.da6056dc.jpg",
  "/static/media/hamburger-1.8db086b6.svg",
  "/static/media/hamburger-2.260b17c1.svg",
  "/favicon.ico",
  "/",
];

this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

this.addEventListener("activate", (e) => {
  console.log("[ServiceWorker] Activate");
});

const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true,
};

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches
        .match(event.request, options)
        .then((response) => {
          if (response) {
            return response || fetch.response;
          }
        })
        .catch((err) => {
          console.log("err", err);
        })
    );
  }
});