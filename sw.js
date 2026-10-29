/* Service worker mínimo: permite instalar las apps. Los datos siempre se leen en vivo de Google. */
const CACHE = 'chobis-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;            // lo de Google pasa directo
  e.respondWith(
    fetch(e.request).then(r => {                          // primero internet, así siempre está actualizado
      const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r;
    }).catch(() => caches.match(e.request))
  );
});
