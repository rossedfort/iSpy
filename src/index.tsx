import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ACTION_TYPES, APP_STORAGE_KEY, DEFAULT_SETTINGS } from './constants';
import './index.css';

/** Set up some mocks for local development */
if (process.env.NODE_ENV === 'development') {
  localStorage.clear();

  const mockLocalStorageItems = [
    { key: 'aaa.'.repeat(30), value: 'wut' },
    { key: 'wowowowow', value: '101010101' },
    { key: 'lolololol', value: 'false' },
    /* tslint:disable max-line-length */
    { key: 'foo', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id eleifend arcu. Mauris accumsan, lorem a dapibus vehicula, sapien massa molestie sem, ac ullamcorper dui magna ac nulla. Maecenas aliquet facilisis lacus, nec laoreet eros bibendum ac.' },
    { key: 'bar', value: JSON.stringify({ some: 'string', boolean: true, number: 100000, nested: { other: 'string' } }) },
    /* tslint:enable max-line-length */
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
    runtime: {
      ...window.chrome.runtime,
      getManifest: () => ({ version: '1.0.0' }),
    },
    storage: {
      ...window.chrome.storage && window.chrome.storage,
      sync: {
        get: (_: any, cb: (res: any) => void) => cb({ [APP_STORAGE_KEY]: DEFAULT_SETTINGS }),
        set: (_: any) => { return; },
      },
    },
    tabs: {
      ...window.chrome.tabs,
      query: (_: any, callback: (tabs: any[]) => void) => {
        callback([mockTab]);
      },
      sendMessage: (_: any, request: any, sendResponse: (res: any) => void) => {
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
      },
    },
  } as any;
}

render(<App />, document.getElementById('root'));
