import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ACTION_TYPES, APP_STORAGE_KEY, DEFAULT_SETTINGS } from './constants';

/** Set up some mocks for local development */
if (process.env.NODE_ENV === 'development') {
  localStorage.clear();

  const mockLocalStorageItems = [
    { key: 'this.is.my.really.long.key.lol.wtf', value: 'wut' },
    { key: 'wowowowow', value: 101010101 },
    { key: 'lolololol', value: false },
    { key: 'foo', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id eleifend arcu. Mauris accumsan, lorem a dapibus vehicula, sapien massa molestie sem, ac ullamcorper dui magna ac nulla. Maecenas aliquet facilisis lacus, nec laoreet eros bibendum ac.' },
    { key: 'bar', value: JSON.stringify({ some: 'string', boolean: true, number: 100000, nested: { other: 'string' } }) },
  ];

  const mockTab = {
    active: true,
    audible: false,
    autoDiscardable: true,
    discarded: false,
    favIconUrl: 'icon.png',
    height: 725,
    highlighted: true,
    id: 872,
    incognito: false,
    index: 33,
    mutedInfo: { muted: false },
    pinned: false,
    selected: true,
    status: 'complete',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id eleifend arcu.',
    url: 'http://localhost:3000/',
    width: 2560,
    windowId: 42,
  };

  for (const { key, value } of mockLocalStorageItems) {
    localStorage.setItem(key, value);
  }

  window.chrome = {
    ...window.chrome,
    storage: {
      ...window.chrome.storage && window.chrome.storage,
      sync: {
        get: (_, cb) => cb({ [APP_STORAGE_KEY]: DEFAULT_SETTINGS }),
        set: (_, cb) => cb(),
      },
    },
    runtime: {
      ...window.chrome.runtime,
      getManifest: () => ({ version: '1.0.0' }),
    },
    tabs: {
      ...window.chrome.tabs,
      query: (_, callback) => {
        callback([mockTab]);
      },
      sendMessage: (_, request, sendResponse) => {
        switch (request.type) {
          case ACTION_TYPES.get:
            sendResponse({ payload: JSON.stringify(localStorage) });
            break;
          case ACTION_TYPES.delete:
            localStorage.removeItem(request.payload);
            sendResponse({ payload: JSON.stringify(localStorage) });
            break;
          case ACTION_TYPES.update:
            localStorage.setItem(request.payload.key, request.payload.value);
            sendResponse({ payload: JSON.stringify(localStorage) });
            break;
          default:
            sendResponse({ error: 'Unrecognized Action' });
            break;
        }
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
