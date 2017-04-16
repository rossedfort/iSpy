chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "ISPY") sendResponse({ data: JSON.stringify(localStorage) });
});
