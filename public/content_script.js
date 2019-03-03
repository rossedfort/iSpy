chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  console.log(`received request with action: ${request.action}`);

  switch (request.action) {
    case 'iSpy.requestData':
      sendResponse({ data: JSON.stringify(localStorage) });
      break;
    default:
      sendResponse({ error: 'Unrecognized Action' });
      break;
  }
});
