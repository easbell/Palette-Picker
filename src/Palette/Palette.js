import React, {Component} from 'react';
import Color from '../Color/Color';
import PaletteForm from '../PaletteForm/PaletteForm';

export class Palette extends Component {
  constructor() {
    super()
    this.state = {
      colors: [],
      showForm: false
    }
  }

  componentDidMount() {
    const colors = this.setColors()
    this.setState({colors})
  }

  setColors = () => {
    let colors = [0, 0, 0, 0, 0]
    let randomColor;
    return colors.map(color => {
      randomColor = this.createColors()
      if(!colors.includes(randomColor)) {
        return randomColor
      } else {
        return this.createColors()
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

  renderColors = () => {
    const { colors } = this.state
    return colors.map(color => {
      return <Color key={color} color={color} savePalette={this.savePalette}/>
    })
  }

  savePalette = () => {
    console.log(this.state.colors)
    this.setState({ showForm: true })
  }

  render() {
    const { showForm, colors } = this.state;
    return(
      <div>
        <button onClick={this.savePalette}>Save Palete</button>
        {this.renderColors()}
        {showForm &&
          <PaletteForm {...colors}/>
        }
      </div>
    )
  }
}

export default Palette