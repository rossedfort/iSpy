import React, { Component } from 'react';
import { ThemeContext } from '../contexts';
import { truncate } from '../utils';
import './TabInfo.css';

class TabInfo extends Component {
  render() {
    const { tab: { title, favIconUrl } } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className="tab-info" style={{ backgroundColor: theme.light, color: theme.foreground }}>
            <p>
              <img className="favicon" src={ favIconUrl || 'missing-favicon.png' } alt="favicon" />
              { title && <span>{ truncate(title, 50) }</span> }
            </p>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default TabInfo;
