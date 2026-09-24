// Check if service worker is supported by our browser.
if (navigator.serviceWorker) {
    // Register the service worker
    navigator.serviceWorker.register("./sw.js", {
        scope: "./",
    })
        .then(res => console.log("Service Worker Registered Successfully"))
        .catch(err => console.log("Service Worker Registration Failed"))
} else {
    console.log("Service Worker is not supported by the browser")
}