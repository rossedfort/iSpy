chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  console.log(`received request with action: ${request.type}`);

  switch (request.type) {
    case 'iSpy.getEntries':
      sendResponse({ payload: JSON.stringify(localStorage) });
      break;
    case 'iSpy.deleteEntry':
      localStorage.removeItem(request.payload);
      sendResponse({ payload: JSON.stringify(localStorage) });
      break;
    case 'iSpy.updateEntry':
      localStorage.setItem(request.payload.key, request.payload.value);
      sendResponse({ payload: JSON.stringify(localStorage) });
      break;
    default:
      sendResponse({ error: 'Unrecognized Action' });
      break;
  }
});
