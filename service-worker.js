const CACHE="ttc-pwa-v12";
const ASSETS=["/","/index.html","/style.css?v=12","/app.js?v=12","/manifest.webmanifest?v=2"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>event.respondWith(fetch(event.request).catch(()=>caches.match(event.request))));
