import React, {Component} from 'react';
import Color from '../Color/Color';
import PaletteForm from '../PaletteForm/PaletteForm';
import './Palette.css';

export class Palette extends Component {
  constructor() {
    super()
    this.state = {
      colors: [],
      lockedColors: [],
      showForm: false
    }
  }

  componentDidMount() {
    this.setColors()
  }
  
  setColors = () => {
    if(this.state.lockedColors.length >= 1) {
      
    }
    let colors = [0, 0, 0, 0, 0]
    let randomColor;
    colors = colors.map(color => {
      randomColor = this.createColors()
      if(!colors.includes(randomColor)) {
        return randomColor
      } else {
        return this.createColors()
      }
    })
    this.setState({colors})
  }

  createColors = () => {
    let digits = '0123456789ABCDEF'
    let hexCode = '#'
    for( let i = 0; i < 6; i++) {
      hexCode += digits[(Math.floor(Math.random() * 16))]
    }
    return hexCode
  }

  lockColor = (color, index) => {
    console.log(color, index)
    const { lockedColors } = this.state;
    lockedColors.forEach(lockedColor => {
      console.log(lockedColor)
      if(!lockedColor.color === color) {
        this.setState({ lockedColors: [...lockedColors, {color, index}]})
      } else {
        const newLocked = lockedColors.filter(lockedColor => {
          console.log(lockedColor)
          return lockedColor.color !== color
        })
        this.setState({ lockedColors: newLocked })      
      }
    })
  }

  renderColors = () => {
    const { colors } = this.state
    return colors.map((color, index) => {
      return <Color key={color} index={index} lockColor={this.lockColor} color={color} savePalette={this.savePalette}/>
    })
  }

  savePalette = (bool) => {
    this.setState({ showForm: bool })
  }

  render() {
    const { showForm, colors } = this.state;
    return(
      <div>
        <button onClick={() => this.savePalette(true)}>Save Palete</button>
        <button onClick={this.setColors} >New Palette</button>
        <div className='palette'>
          {this.renderColors()}
        </div>
        {showForm &&
          <PaletteForm savePalette={this.savePalette} colors={colors}/>
        }
      </div>
    )
  }
}

export default Palette