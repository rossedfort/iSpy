import React, { Component } from 'react';
import { themes, ThemeContext } from '../contexts';
import { Toggle, RadioButton } from '../common';
import './SettingsPanel.css';

class SettingsPanel extends Component {
  render() {
    const {
      isOpen,
      onClickOverlay,
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
              <div className="settings-item">
                <span>About</span>
              </div>
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default SettingsPanel;
