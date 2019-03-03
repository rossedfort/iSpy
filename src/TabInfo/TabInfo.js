import React, { Component } from 'react';
import { truncate } from '../utils';
import './TabInfo.css';

export class TabInfo extends Component {
  render() {
    const { tab: { title, favIconUrl } } = this.props;

    return (
      (title && favIconUrl) ? <div className="tab-info">
        <p>
          <img className="favicon" src={favIconUrl} alt="favicon" />
          <span>{ truncate(title) }</span>
        </p>
      </div> : null
    )
  }
}
