const STATIC_CACHE = "uni-static-v2";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== STATIC_CACHE).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

function isCacheableRequest(requestUrl, method) {
  if (method !== "GET") return false;
  const ext = requestUrl.pathname.split(".").pop()?.toLowerCase() || "";
  return new Set(["js", "css", "png", "jpg", "jpeg", "webp", "svg", "glb", "woff", "woff2"]).has(ext);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (!isCacheableRequest(url, request.method)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);

      if (cached) {
        event.waitUntil(
          fetch(request)
            .then((response) => {
              if (response.ok) return cache.put(request, response.clone());
              return null;
            })
            .catch(() => null),
        );
        return cached;
      }

      try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) await cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch {
        return Response.error();
      }
    })(),
  );
});
