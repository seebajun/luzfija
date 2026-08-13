// CloudFront Function (viewer-request) para SPA routing.
// Publicada en la consola AWS como "luzfija-spa-router" (Runtime cloudfront-js-2.0)
// y asociada al comportamiento por defecto de la distribucion (viewer-request).
// Reescribe las rutas sin extension de archivo a /index.html asi el router
// de React (BrowserRouter) funciona en rutas como /gear, /merch, etc.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var parts = uri.split("/");
  var last = parts[parts.length - 1];
  var hasExtension = last.indexOf(".") !== -1;

  if (uri === "/" || uri === "/index.html" || hasExtension) {
    return request;
  }

  request.uri = "/index.html";
  return request;
}