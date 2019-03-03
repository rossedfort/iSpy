import React, { Component } from 'react';

import { themes, ThemeContext } from '../contexts';
import { Toggle, RadioButton } from '../common';
import './SettingsPanel.css';

class SettingsPanel extends Component {
  render() {
    const {
      isOpen,
      onClickOverlay,
      version,
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {( { theme, availableThemes, toggleTheme, toggleMode, mode } ) => (
          <>
            <div onClick={onClickOverlay} className={`overlay ${isOpen ? 'is-active' : 'is-inactive'}`}></div>
            <div className={`app-settings-panel ${isOpen ? 'open' : 'closed'}`}>
              <div className="settings-item">
                <span>Theme</span>
                <div className="themes">
                  {
                    availableThemes.map((t) => (
                      <RadioButton
                        style={{ backgroundColor: themes[t].representation }}
                        key={t}
                        value={t}
                        checked={t === theme.name}
                        onChange={toggleTheme}
                      />
                    ))
                  }
                </div>
              </div>
              <div className="settings-item">
                <span>Dark Mode</span>
                <Toggle value={mode === 'dark'} onToggle={toggleMode} />
              </div>
              <div className="settings-item about">
                <small>Created by Ross Edfort with&nbsp;
                  <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a>
                </small>
                <small>Icons by&nbsp;
                  <a target="_blank" rel="noopener noreferrer" href="https://fontawesome.com/license">Font Awesome</a>
                </small>
                { version && <small>Version: {version}</small> }
              </div>
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default SettingsPanel;
