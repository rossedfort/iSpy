chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  console.log(`received request with action: ${request.action}`);

  switch (request.action) {
    case 'iSpy.getEntries':
      sendResponse({ data: JSON.stringify(localStorage) });
      break;
    case 'iSpy.deleteEntry':
      localStorage.removeItem(request.data);
      sendResponse({ data: JSON.stringify(localStorage) });
      break;
    case 'iSpy.updateEntry':
      localStorage.setItem(request.data.key, request.data.value);
      sendResponse({ data: JSON.stringify(localStorage) });
      break;
    default:
      sendResponse({ error: 'Unrecognized Action' });
      break;
  }
});
