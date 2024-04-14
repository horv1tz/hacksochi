const InjectedJavaScript = `
    (function() {
        const html = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(html);
    })();
`;

export default InjectedJavaScript;
