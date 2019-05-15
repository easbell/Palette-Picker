import React, {Component} from 'react';
import Color from '../Color/Color';
import PaletteForm from '../../containers/PaletteForm/PaletteForm';
import './Palette.css';

export class Palette extends Component {
  constructor() {
    super()
    this.state = {
      color1: {color: '', locked: false},
      color2: {color: '', locked: false},
      color3: {color: '', locked: false},
      color4: {color: '', locked: false},
      color5: {color: '', locked: false},
      showForm: false
    }
  }

  componentDidMount() {
    this.setColors()
  }
  
  setColors = () => {
    Object.keys(this.state).forEach(color => {
      if(color.includes('color') && this.state[color]['locked'] === false) {
        this.setState({ [color]: { color: this.createColors(), locked: false }})
      }
    })
  }

  createColors = () => {
    let digits = '0123456789ABCDEF'
    let hexCode = '#'
    for( let i = 0; i < 6; i++) {
      hexCode += digits[(Math.floor(Math.random() * 16))]
    }
    return hexCode
  }

  colorKeys = () => {
    const stateKeys = Object.keys(this.state)
    return stateKeys.splice(0, stateKeys.length - 1)
  }
  
  renderColors = () => {
    const colors = this.colorKeys()
    return colors.map(color => {
      const hexCode = this.state[color].color
      return <Color key={color} lockColor={this.lockColor} color={hexCode}/>
    })
  }

  lockColor = (lockedColor) => {
    const colors = this.colorKeys()
    colors.forEach(colorKey => {
      if(this.state[colorKey].color === lockedColor) {
        this.setState({ [colorKey]: { color: lockedColor, locked: 
        !this.state[colorKey].locked }})
      }
      }
    )
  }

  showForm = (bool) => {
    this.setState({ showForm: bool })
  }

  render() {
    const { showForm } = this.state;
    return(
      <div>
        <div className='palette'>
          {this.renderColors()}
        </div>
        <button onClick={() => this.showForm(true)} className='save controls'>Save Palette</button>
        <button onClick={this.setColors} className='controls'>New Palette</button>
        {showForm &&
          <PaletteForm show={this.state.showForm} showForm={this.showForm} colors={{...this.state}}/>
        }
      </div>
    )
  }
}

export default Palette