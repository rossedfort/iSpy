import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/** Set up some mocks for local development */
if (process.env.NODE_ENV === 'development') {
  localStorage.clear();

  const mockLocalStorageItems = [
    { key: 'number', value: 101010101 },
    { key: 'boolean', value: false },
    { key: 'long', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id eleifend arcu. Mauris accumsan, lorem a dapibus vehicula, sapien massa molestie sem, ac ullamcorper dui magna ac nulla. Maecenas aliquet facilisis lacus, nec laoreet eros bibendum ac.' },
    { key: 'object', value: JSON.stringify({ some: 'string', boolean: true, number: 100000, nested: { other: 'string' } }) },
  ];

  const mockTab = {
    active: true,
    audible: false,
    autoDiscardable: true,
    discarded: false,
    favIconUrl: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png',
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
    tabs: {
      query: (_, callback) => {
        callback([mockTab]);
      },
      sendMessage: (_, __, callback) => {
        callback({ data: JSON.stringify(localStorage) });
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
