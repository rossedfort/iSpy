/* global chrome */
import React, { Component } from 'react';
import uuid from 'uuid/v4';

import TabInfo from './TabInfo/TabInfo';
import LocalStorageEntry from './LocalStorageEntry/LocalStorageEntry';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { themes, ThemeContext } from './contexts';
import { ACTION_TYPES, INITIAL_STATE, DEFAULT_SETTINGS, APP_STORAGE_KEY } from './constants';
import './App.css';
import { Button } from './common';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    chrome.storage.sync.get([APP_STORAGE_KEY], (cachedSettings) => {
      const settings = cachedSettings ? {
        ...DEFAULT_SETTINGS,
        ...cachedSettings[APP_STORAGE_KEY],
      } : DEFAULT_SETTINGS;
  
      this.setState({ settings });
    });
  }

  componentDidMount() {
    if (chrome.runtime && chrome.runtime.getManifest) {
      const { version } = chrome.runtime.getManifest();
      this.setState({ version });
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([ activeTab ]) => {
      this.setState({ tab: activeTab }, () => {
        this.getEntries();
      });
    });
  }

  getEntries() {
    const { tab: { id: activeTabId } } = this.state;
    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.get }, (response) => {
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
    const { tab: { id: activeTabId }, entries: { [id]: { parsed: { key } } } } = this.state;

    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.delete, payload: key }, (response) => {
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
    const { tab: { id: activeTabId }, entries: { [id]: { parsed } } } = this.state

    chrome.tabs.sendMessage(activeTabId, { type: ACTION_TYPES.update, payload: parsed }, (response) => {
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

  onModeChange = () => {
    this.setState(({ settings }) => {
      const mode = settings.mode === 'dark' ? 'light' : 'dark';
      const color = settings.color;

      return {
        settings: {
          ...settings,
          mode,
          theme: themes[color][mode],
        }
      };
    }, this.persistState);
  }

  onThemeChange = (color) => {
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        color,
        theme: themes[color][settings.mode],
      }
    }), this.persistState);
  }

  persistState = () => {
    chrome.storage.sync.set({ [APP_STORAGE_KEY]: this.state.settings });
  }

  render() {
    const {
      tab,
      entries,
      entryIds,
      showSettings,
      settings: {
        theme,
        mode,
        availableThemes
      },
      version,
    } = this.state;
    const ctx = {
      theme,
      mode,
      availableThemes,
      toggleMode: this.onModeChange,
      toggleTheme: this.onThemeChange,
    };

    return (
      <ThemeContext.Provider value={ctx}>
        <SettingsPanel
          version={version}
          isOpen={showSettings}
          onClickOverlay={this.toggleSettingsPanel}
        />
        <div className="app">
          <header className="app-header" style={{ backgroundColor: theme.darker, color: theme.foreground }}>
            <h2>iSpy</h2>
            <Button onClick={this.toggleSettingsPanel} className="dropdown">
              <span className="icon-cog-solid fs1"></span>
              <span className={`icon-caret-${ showSettings ? 'up' : 'down' }-solid fs0`}></span>
            </Button>
          </header>
          <TabInfo tab={tab} />
          {
            <div className="local-storage-entries" style={{ backgroundColor: theme.lighter, color: theme.foreground }}>
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
          <footer className="app-footer"  style={{ backgroundColor: theme.darker, color: theme.foreground }}>
            <small>Made with&nbsp;<span role="img" aria-label="purple heart emoji">💜</span>by&nbsp;
              <a style={{ color: theme.foreground }} href="https://rossedfort.com" target="_blank" rel="noopener noreferrer">Ross Edfort</a>
            </small>
          </footer>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
