browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_html") {
        const { tabId } = message;

        // Pedir al content script el HTML de la pestaña activa
        browser.tabs.sendMessage(tabId, { action: "get_html" }, (response) => {
            if (browser.runtime.lastError) {
                console.error("Error al obtener el HTML:", browser.runtime.lastError.message);
                return;
            }

            const { html } = response;

            // Crear una nueva pestaña con `viewer.html`
            browser.tabs.create({ url: browser.runtime.getURL("extension/viewer.html") }, (tab) => {
                browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status === "complete") {
                        // Enviar el HTML completo al viewer.html
                        browser.tabs.sendMessage(tabId, { html }, () => {
                            if (browser.runtime.lastError) {
                                console.error("Error al enviar mensaje:", browser.runtime.lastError.message);
                            }
                        });
                        browser.tabs.onUpdated.removeListener(listener);
                    }
                });
            });
        });
    }
});
