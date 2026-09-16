const CACHE_NAME = "demo/v1";

const CACHE_FILES = [
    "./index.html",
    "./style.css",
    "./photo.png",
    "./script.js",
]

// Here "self" is our current service worker
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(CACHE_FILES);
            })
    )
})

self.addEventListener("activate", (e) => {
    // Cleanup useless Cache
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key != CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        })
    )
});

self.addEventListener("fetch", (e) => {
    // As a good practice, it is better to fetch the required asset from the server and update that specific asset in the cache in order to keep the cache updated.
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                // Update the Cache
                const clonedData = res.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, clonedData); // Update the specific asset
                });
                console.log("Returning from Network");
                return res;
            })
            .catch(() => {
                console.log("Returning from Cache");
                return caches.match(e.request).then((file) => file); // Return required asset from cache in case of no internet or server failure.
            })
    )
});