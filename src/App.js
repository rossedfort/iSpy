/* global chrome */
import React, { Component } from 'react';
import { TabInfo } from './TabInfo';
import { LocalStorageEntry } from './LocalStorageEntry';
import uuid from 'uuid/v4';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: {},
      localStorageEntries: {},
    };
  }

  componentDidMount() {
    console.log('initializing... requesting active tab');

    chrome.tabs.query({ active: true, currentWindow: true }, ([ activeTab ]) => {
      console.log('got tab: ', activeTab);
      this.setState({ tab: activeTab }, () => {
        this.requestTabData();
      });
    });
  }

  requestTabData() {
    const { tab: { id: activeTabId } } = this.state;
    console.log(`requesting data from tab: ${activeTabId}`);

    chrome.tabs.sendMessage(activeTabId, { action: 'iSpy.getEntries' }, (response) => {
      console.log(`got data: ${response.data}`);
      this.setState({ localStorageEntries: this.formatEntries(response.data) });
    });
  }

  formatEntries(stringifiedEntries) {
    const parsed = JSON.parse(stringifiedEntries);
    return Object.keys(parsed).reduce((entries, key) => {
      const entry = this.formatEntry(parsed, key);

      return { ...entries, ...entry };
    }, {});
  }

  formatEntry(parsed, key) {
    const id = uuid();
    const value = parsed[key];

    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch (error) {
      parsedValue = value;
    }

    return {
      [id]: {
        parsed: { key, value },
        stringified: JSON.stringify({ [key]: parsedValue }, null, 2),
        id,
      },
    };
  }

  deleteLocalStorageEntry = (key) => {
    console.log(`deleting localStorage entry with key ${key}`);
    const { tab: { id: activeTabId } } = this.state;

    chrome.tabs.sendMessage(activeTabId, { action: 'iSpy.deleteEntry', data: key }, (response) => {
      console.log(`deleted localStorage entry with key: ${key}`);
      this.setState({ localStorageEntries: this.formatEntries(response.data) });
    });
  }

  onEntryChange = (id, value) => {
    const { localStorageEntries } = this.state
    const entry = localStorageEntries[id];
    const newEntries = {
      ...localStorageEntries,
      [id]: {
        ...entry,
        parsed: {
          ...entry.parsed,
          value,
        },
        stringified: JSON.stringify({ key: entry.parsed.key, value }, null, 2),
      }
    };

    this.setState({ localStorageEntries: newEntries });
  }

  saveLocalStorageEntry = (id) => {
    console.log(`saving localStorage entry with id: ${id}`);
    const { tab: { id: activeTabId }, localStorageEntries: { [id]: { parsed } } } = this.state

    chrome.tabs.sendMessage(activeTabId, { action: 'iSpy.updateEntry', data: parsed }, (response) => {
      console.log(`saved localStorage entry with key: ${parsed.key}`);
      this.setState({ localStorageEntries: this.formatEntries(response.data) });
    });
  }

  render() {
    const { tab, localStorageEntries } = this.state;
    const entryIds = Object.keys(localStorageEntries);

    return (
      <div className="App">
        <header className="App-header">
          <h2>iSpy - a localStorage manager</h2>
        </header>
        <TabInfo tab={tab} />
        {
          entryIds.length > 0 && <div className="local-storage-entries">
            {
              entryIds.map((id) => (
                <LocalStorageEntry
                  key={id}
                  onEntryChange={this.onEntryChange}
                  onSave={this.saveLocalStorageEntry}
                  onDelete={this.deleteLocalStorageEntry}
                  entry={localStorageEntries[id]}
                />
              ))
            }
          </div>
        }
        <footer className="App-footer">
          <small>Made with <span role="img" aria-label="purple heart emoji">💜</span> by <a href="https://rossedfort.com" target="_blank" rel="noopener noreferrer">Ross Edfort</a></small>
        </footer>
      </div>
    );
  }
}

export default App;
