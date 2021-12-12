const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'styles.css',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
]

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    )
});

// Activates cleaning up old caches
self.addEventListener('activate', (event)=>{
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName))
            })
            .then((deleteCaches) => {
                return Promise.all(
                    deleteCaches.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete)
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});