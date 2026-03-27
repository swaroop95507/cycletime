const CACHE_NAME = "cycle-app-v1";
const urlsToCache = ["./","./index.html","./manifest.json"];

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event=>{
  if(event.request.url.startsWith("http")){
    event.respondWith(
      caches.match(event.request).then(response=>{
        return response || fetch(event.request);
      })
    );
  }
});
