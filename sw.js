

 var CACHE_NAME  = 'mws-cache-v1';
 var urlsToCache = [
'/', 
'/img/',
];

self.addEventListener('install', function(event) {
  // Instalamos el service worker
  event.waitUntil(   
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('cache instalada');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
	//interceptamos las peticiones
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // si esta en la cache, la devolvemos
        if (response) {
        	console.log("pagina servida desde cache");
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
