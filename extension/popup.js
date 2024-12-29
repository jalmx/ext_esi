chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
  
    // Verificar si la URL del tab corresponde al dominio especificado
    const isEsiApiDomain = currentTab.url.startsWith("https://esiapi.edu.mx/");
  
    // Si el dominio es el correcto, habilitar el botón
    if (isEsiApiDomain) {
        addEventListener("click", (event) => {
    
            if (event.target.tagName === "BUTTON") {
                console.log(event.target);
                browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    const tab = tabs[0];
                    // Enviar un mensaje al background para que extraiga el HTML
                    browser.runtime.sendMessage({ action: "extract_html", tabId: tab.id });
                });
            }
        })
    }else{
        console.log("no debe hacer nada, quitar todo el html");
        
    }
  });


