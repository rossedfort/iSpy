import React, { Component } from 'react';
import { truncate } from '../utils';
import './TabInfo.css';

export class TabInfo extends Component {
  render() {
    const { tab: { title, favIconUrl } } = this.props;

    return (
      <div className="tab-info">
        <p>
          <img className="favicon" src={ favIconUrl || 'missing-favicon.png' } alt="favicon" />
          { title && <span>{ truncate(title, 50) }</span> }
        </p>
      </div>
    )
  }
}
