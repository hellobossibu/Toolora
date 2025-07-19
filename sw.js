// Service Worker for ToolKit Pro - Offline Functionality
const CACHE_NAME = 'toolkit-pro-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/youtube-thumbnail-downloader.html',
  '/emoji-translator.html',
  '/password-generator.html',
  '/qr-code-maker.html',
  '/pdf-to-flipbook.html',
  '/resume-score-checker.html',
  '/twitter-video-downloader.html',
  '/auto-caption-video.html',
  '/auto-caption-video.js',
  '/twitter-video-downloader.js',
  '/resume-score-checker.js',
  '/pdf-to-flipbook.js',
  '/qr-code-maker.js',
  '/password-generator.js',
  '/emoji-translator.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.woff2'
];

// Install event - cache all resources
self.addEventListener('install', event => {
  console.log('🛠️ Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching app shell and resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('📦 Serving from cache:', event.request.url);
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              // Don't cache external API calls or dynamic content
              if (!event.request.url.includes('api.') && 
                  !event.request.url.includes('analytics') &&
                  !event.request.url.includes('tracking')) {
                cache.put(event.request, responseToCache);
                console.log('💾 Caching new resource:', event.request.url);
              }
            });

          return response;
        }).catch(error => {
          console.log('🌐 Network request failed, serving offline page:', error);
          
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // Return a custom offline response for other requests
          return new Response(
            JSON.stringify({
              error: 'You are offline. Please check your internet connection.',
              cached: false
            }), {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }
          );
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any pending offline actions here
      console.log('🔄 Processing background sync...')
    );
  }
});

// Push notification handling
self.addEventListener('push', event => {
  console.log('📱 Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available for ToolKit Pro!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open ToolKit Pro',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ToolKit Pro', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('👆 Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', event => {
  console.log('💬 Message received in Service Worker:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🛠️ ToolKit Pro Service Worker loaded successfully!'); 