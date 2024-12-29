browser.runtime.onMessage.addListener((message) => {
  if (message.html) {
    document.open(); // Abrir el documento actual para escritura
    document.write(message.html); // Escribir el contenido HTML recibido
    document.close(); // Cerrar el documento para que el navegador lo renderice
  }
});
