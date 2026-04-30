const STATIC_CACHE = "uni-static-v1";
const MEDIA_CACHE = "uni-media-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([STATIC_CACHE, MEDIA_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

function isCacheableRequest(requestUrl, method) {
  if (method !== "GET") return false;

  const ext = requestUrl.pathname.split(".").pop()?.toLowerCase() || "";
  const staticExts = new Set(["js", "css", "png", "jpg", "jpeg", "webp", "svg", "glb", "woff", "woff2"]);
  const mediaExts = new Set(["mp4", "webm"]);

  return {
    staticAsset: staticExts.has(ext),
    mediaAsset: mediaExts.has(ext),
  };
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const cacheInfo = isCacheableRequest(url, request.method);
  if (!cacheInfo.staticAsset && !cacheInfo.mediaAsset) return;

  const cacheName = cacheInfo.mediaAsset ? MEDIA_CACHE : STATIC_CACHE;

  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
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
