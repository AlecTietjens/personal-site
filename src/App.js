import React, { Component } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import './App.css';
import balls from './balls.js';

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
const springSetting3 = {stiffness: 100, damping: 13};

class Ball extends Component {
  constructor(props) {
    super(props);
    this.initX = parseInt(this.props.positionx);
    this.initY = parseInt(this.props.positiony);
    this.zIndex = parseInt(this.props.zIndex);

    this.state = {
      x: this.initX,
      y: this.initY,
      radius: randomRadius(),
      mouseEntered: false,
      radiusChanging: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    setInterval(
      () => this.changeRadius(),
      300
    );
  }

  changeRadius() {
    if(!this.state.radiusChanging && Math.random() > .99) {
      this.setState({ radiusChanging: true, radius: randomRadius() });
    }
  }

  endRadiusChange() {
    this.setState({ radiusChanging: false });
  }

  handleMouseEnter(event) {
    this.setState({
      x: this.state.x + this.initX + this.state.radius - event.clientX,
      y: this.state.y + this.initY + this.state.radius - event.clientY,
      mouseEntered: true
    });
  }

  handleMouseLeave(event) {
    this.setState({
      x: this.initX,
      y: this.initY,
      mouseEntered: false
    });
  }

  render() {
    let translateX;
    let translateY;
    let scale;
    let style;
    let transition;
    if(this.state.radiusChanging) {
      setTimeout(
        () => this.endRadiusChange(),
        1000
      );
    }
    if(this.state.mouseEntered) {
      style = {
        translateX: spring(this.state.x, springSetting1),
        translateY: spring(this.state.y, springSetting1),
        scale: spring(1, springSetting1),
        boxShadow: spring((this.state.x / 10 - (3 * this.state.radius*2 - 50) / 2) / 15, springSetting1),
      }
    }
    else {
      style = {
        translateX: spring(this.state.x, springSetting2),
        translateY: spring(this.state.y, springSetting2),
        scale: spring(1.2, springSetting2),
        boxShadow: spring((this.state.x / 10- (3 * this.state.radius*2 - 50) / 2) / 15, springSetting1),
        width: spring(this.state.radius*2, springSetting3),
        height: spring(this.state.radius*2, springSetting3),
        // color only updates when ANY state changes for now..
        r: spring(randomRGBValue(), springSetting1),
        g: spring(randomRGBValue(), springSetting1),
        b: spring(randomRGBValue(), springSetting1)
      }
    }
    return (
      <div style={{left: this.initX, top: this.initY}}>
        <Motion style={style}> 
          {({translateX, translateY, scale, boxShadow, width, height, r, g, b}) =>
            <div onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              style={{backgroundColor: `rgb(${r}, ${g}, ${b})`,
                  width: `${width}px`,
                  height: `${height}px`,
                  WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  transition: `width 2s height 2s backgroundColor 2s`,
                  boxShadow: `${boxShadow}px 4px 4px rgba(0,0,0,0.3)`,
                  zIndex: this.zIndex }}
              className="Ball"
            />
          }
        </Motion>
      </div>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav>
        <a href="https://linkedin.com/in/alectietjens" target="_">LinkedIn</a>
        <a href="https://github.com/alectietjens" target="_">GitHub</a>
        <a href="https://facebook.com/alec.tietjens" target="_">Facebook</a>
        <a href="mailto:alec@tietjens.com">Email</a>
        <a href="./AlecTietjensResume.pdf" target="_">Resume</a>
      </nav>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav />
      {balls.map((ball, index) =>
        <Ball positionx={ball.x} key={index}
            positiony={ball.y}
            zIndex={randomZindex()} />
      )}
      </div>
    );
  }
}

export default App;

//------------ UTILITIES -------------
function randomColor() {
  const allColors2 = [
    '#249E86', '#109177', '#0E705D', '#065848', '#00352B', '#6232A9', '#4F1D9A',
    '#3F1878', '#2E0E5E', '#190438', '#F8E438', '#E2CE19', '#B0A016', '#8A7D09',
    '#534B00', '#F88438', '#E26819', '#B05316', '#8A3C09', '#532100'
  ]
  let min = Math.ceil(0);
  let max = Math.floor(allColors2.length);
  return allColors2[Math.floor(Math.random() * (max - min)) + min];
}

function randomZindex() {
  let min = Math.ceil(0);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomRGBValue() {
  let min = Math.ceil(0);
  let max = Math.floor(255);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomRadius() {
  let min = Math.ceil(Math.floor(window.innerHeight*.0215));
  let max = Math.floor(window.innerHeight*.0335);
  return Math.floor(Math.random() * (max - min)) + min;
}