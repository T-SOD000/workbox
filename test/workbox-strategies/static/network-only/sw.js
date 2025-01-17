/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

importScripts('/__WORKBOX/buildFile/workbox-sw');
importScripts('/infra/testing/comlink/sw-interface.js');

workbox.routing.registerRoute(
    new RegExp('/__WORKBOX/uniqueValue'),
    new workbox.strategies.NetworkOnly({
      cacheName: 'network-only',
    }),
);

self.addEventListener('install', (event) => event.waitUntil(
    caches.open('network-only')
        .then((cache) => cache.put('/__WORKBOX/uniqueValue', new Response('Cached')))
        .then(() => self.skipWaiting()))
);
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
