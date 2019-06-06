import React, { Component } from 'react';
import { Button } from '../../common';
import { ThemeContext } from '../../contexts';
import { truncate } from '../../utils/truncate';
import './Toolbar.css';

interface ToolbarProps {
  entryKey: string;
  editLabel: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

interface ToolbarState {
  copyIcon: string;
}

class Toolbar extends Component<ToolbarProps, ToolbarState> {
  public state = { copyIcon: 'copy' };
  public timeout: number = 0;

  public componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  public render() {
    const { entryKey, onClickEdit, onClickDelete, editLabel } = this.props;
    const { copyIcon } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className='toolbar' style={{ backgroundColor: theme.light, color: theme.foreground }}>
            <section>
              <span>{truncate(entryKey, 20)}</span>
            </section>
            <section>
              <Button
                className='is-icon-button'
                onClick={this.copy}>
                <i className={`fas fa-${copyIcon}`}></i>
              </Button>
              <Button
                className='is-icon-button'
                onClick={onClickEdit}>
                <i className={`fas fa-${editLabel}`}></i>
              </Button>
              <Button
                className='is-icon-button'
                onClick={onClickDelete}>
                <i className='fas fa-trash'></i>
              </Button>
            </section>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }

  private copy = () => {
    const { entryKey } = this.props;
    const textarea = document.createElement('textarea');
    textarea.value = entryKey;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const didCopy = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (didCopy) {
      this.setState({ copyIcon: 'check' }, () => {
        this.timeout = window.setTimeout(() => this.setState({ copyIcon: 'copy' }), 2500);
      });
    }
  }
}

export default Toolbar;
