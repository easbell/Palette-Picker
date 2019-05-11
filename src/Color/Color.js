import React, { Component } from 'react';
import './Color.css';

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
        { locked 
          ? <i className="fas fa-lock"></i>
          : <i className="fas fa-lock-open"></i>
        }
      </div>
    )
  }
}

export default Color;