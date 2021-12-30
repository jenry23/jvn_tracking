importScripts("/precache-manifest.fd11664d749dcee726d6d8106629e945.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

} 
else {
    console.log(`Workbox didn't load`);
}
