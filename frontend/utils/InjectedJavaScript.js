
export default `
  window.addEventListener('click', function(event) {
    const element = event.target;
    if (element.classList.contains('photos-thumbnail-view _type_serp')) {
      const storeId = element.dataset.id;
      window.ReactNativeWebView.postMessage('storeSelected', storeId);
    }
  });
`;
