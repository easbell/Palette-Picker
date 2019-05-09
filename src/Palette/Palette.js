import React, {Component} from 'react'
import Color from '../Color/Color'

export class Palette extends Component {
  constructor() {
    super()
    this.state = {
      colors: [],
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
      return <Color key={color} color={color} />
    })

  }
  render() {
    return(
      <div>
        {this.renderColors()}
      </div>
    )
  }
}

export default Palette