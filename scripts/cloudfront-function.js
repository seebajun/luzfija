// CloudFront Function (viewer-request) para SPA routing.
// Pegar este codigo en la consola de AWS CloudFront > Functions > Create.
// Asocia la funcion al comportamiento por defecto de la distribucion.
// Reescribe las rutas sin extension de archivo a /index.html asi el router
// de React (BrowserRouter) funciona en rutas como /gear, /merch, etc.
export function handler(event) {
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