import React, { Component } from 'react';
import { Toggle } from '../common';
import './SettingsPanel.css';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      darkMode: true,
      theme: 'purple',
      themes: ['purple', 'green', 'blue'],
    };
  }

  onModeChange = () => {
    this.setState(({ darkMode }) => ({
      darkMode: !darkMode,
    }));
  }

  onThemeChange = (theme) => {
    this.setState({ theme });
  }

  render() {
    const { darkMode, theme, themes } = this.state;
    const { isOpen, onClickOverlay } = this.props;

    return (
      <>
        <div onClick={onClickOverlay} className={`overlay ${isOpen ? 'is-active' : 'is-inactive'}`}></div>
        <div className={`app-settings-panel ${isOpen ? 'open' : 'closed'}`}>
          <div className="settings-item">
            <span>Theme</span>
            <div className="themes">
              {
                themes.map((t) => (
                  <input
                    key={t}
                    checked={t === theme}
                    type="checkbox"
                    className={`theme ${t}`}
                    name={t}
                    onChange={() => this.onThemeChange(t)}>
                  </input>
                ))
              }
            </div>
          </div>
          <div className="settings-item">
            <span>Dark Mode</span>
            <Toggle value={darkMode} onToggle={this.onModeChange} />
          </div>
          <div className="settings-item">
            <span>About</span>
          </div>
        </div>
      </>
    );
  }
}

export default SettingsPanel;
