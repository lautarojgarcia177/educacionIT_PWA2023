self.addEventListener("install", (e) => {
  console.log("SW Instalado");
});

self.addEventListener("activate", (e) => {
  console.log("SW Activado");
});

self.addEventListener("fetch", (e) => {
  console.log("fetch");
  e.respondWith(e.request);
});

self.addEventListener("sync", (e) => {
  console.log("Notificacion SYNC enviada", e);
});

self.addEventListener("push", (e) => {
  console.log("Notificacion PUSH enviada", e);
});
