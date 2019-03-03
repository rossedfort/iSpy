/* global chrome */
import React, { Component } from 'react';
import { TabInfo } from './TabInfo';
import { LocalStorageEntry } from './LocalStorageEntry';
import { SettingsPanel } from './SettingsPanel';
import { ACTION_TYPES } from './utils';
import uuid from 'uuid/v4';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: {},
      entries: {},
      entryIds: [],
      showSettings: false,
    };
  }

  componentDidMount() {
    console.log('initializing... requesting active tab');

    chrome.tabs.query({ active: true, currentWindow: true }, ([ activeTab ]) => {
      console.log('got tab: ', activeTab);
      this.setState({ tab: activeTab }, () => {
        this.getEntries();
      });
    });
  }

  getEntries() {
    const { tab: { id: activeTabId } } = this.state;
    console.log(`requesting data from tab: ${activeTabId}`);

    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.get }, (response) => {
      console.log(`got data: ${response.payload}`);
      const entries = this.formatEntries(response.payload);
      const entryIds = Object.keys(entries);

      this.setState({ entries, entryIds });
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
        parsed: { key, value: JSON.stringify(parsedValue, null, 2) },
        stringified: JSON.stringify({ [key]: parsedValue }, null, 2),
        id,
      },
    };
  }

  deleteEntry = (id) => {
    console.log(`deleting localStorage entry with id ${id}`);
    const { tab: { id: activeTabId }, entries: { [id]: { parsed: { key } } } } = this.state;

    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.delete, payload: key }, (response) => {
      console.log(`deleted localStorage entry with key: ${key}`);
      const entries = this.formatEntries(response.payload);
      const entryIds = Object.keys(entries);

      this.setState({ entries, entryIds });
    });
  }

  onEntryChange = (id, value) => {
    const { entries } = this.state
    const entry = entries[id];
    const newEntries = {
      ...entries,
      [id]: {
        ...entry,
        parsed: {
          ...entry.parsed,
          value,
        },
        stringified: JSON.stringify({ key: entry.parsed.key, value }, null, 2),
      }
    };

    this.setState({ entries: newEntries });
  }

  saveEntry = (id) => {
    console.log(`saving localStorage entry with id: ${id}`);
    const { tab: { id: activeTabId }, entries: { [id]: { parsed } } } = this.state

    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.update, payload: parsed }, (response) => {
      console.log(`saved localStorage entry with key: ${parsed.key}`);
      const entries = this.formatEntries(response.payload);
      const entryIds = Object.keys(entries);

      this.setState({ entries, entryIds });
    });
  }

  toggleSettingsPanel = () => {
    this.setState(({ showSettings }) => ({
      showSettings: !showSettings
    }));
  }

  render() {
    const { tab, entries, entryIds, showSettings } = this.state;

    return (
      <>
        <SettingsPanel onClickOverlay={this.toggleSettingsPanel} isOpen={showSettings} />
        <div className="App">
          <header className="App-header">
            <h2>iSpy - a localStorage manager</h2>
            <button onClick={this.toggleSettingsPanel} className="dropdown">
              <span className="icon-cog-solid fs1"></span>
              <span className="icon-caret-down-solid fs0"></span>
            </button>
          </header>
          <TabInfo tab={tab} />
          {
            entryIds.length > 0 && <div className="local-storage-entries">
              {
                entryIds.map((id) => (
                  <LocalStorageEntry
                    key={id}
                    onEntryChange={this.onEntryChange}
                    onSave={this.saveEntry}
                    onDelete={this.deleteEntry}
                    entry={entries[id]}
                  />
                ))
              }
            </div>
          }
          <footer className="App-footer">
            <small>Made with <span role="img" aria-label="purple heart emoji">💜</span>by <a href="https://rossedfort.com" target="_blank" rel="noopener noreferrer">Ross Edfort</a></small>
          </footer>
        </div>
      </>
    );
  }
}

export default App;
