import React, { Component } from 'react';
import './Color.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

export class Color extends Component {
  constructor() {
    super();
    this.state = {
      locked: false
    }
  }

  toggleLock = () => {
    const { lockColor, color } = this.props;
    this.setState({ locked: !this.state.locked })
    lockColor(color)
  }

  render() {
    const { color } = this.props;
    const { locked } = this.state;
    return (
      <div style={{backgroundColor: color}} onClick={this.toggleLock} className='color'>
        <OverlayTrigger
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-${'top'}`}>
              Click to lock color.
            </Tooltip>
          }>
        <Button variant="secondary" className='lock'>
          { locked 
            ? <i className="fas fa-lock"></i>
            : <i className="fas fa-lock-open"></i>
          }
        </Button>
        </OverlayTrigger>
      </div>
    )
  }
}

export default Color;