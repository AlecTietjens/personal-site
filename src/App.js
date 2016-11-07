import React, { Component } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import './App.css';
import balls from './balls.js';

// spring settings used for bubble movement and scaling
const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
const springSetting3 = {stiffness: 100, damping: 13};

// ball class.. each ball individually has state
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

  // set interval for change radius function
  componentDidMount() {
    setInterval(
      () => this.changeRadius(),
      400
    );
  }

  // 1% chance of changing radius every .4 seconds
  changeRadius() {
    if(!this.state.radiusChanging && Math.random() > .99) {
      this.setState({ radiusChanging: true, radius: randomRadius() });
    }
  }

  endRadiusChange() {
    this.setState({ radiusChanging: false });
  }

  // move ball/bubble in opoosite direction of enter
  handleMouseEnter(event) {
    this.setState({
      x: this.state.x + this.initX + this.state.radius - event.clientX,
      y: this.state.y + this.initY + this.state.radius - event.clientY,
      mouseEntered: true
    });
  }

  // return ball when mouse leaves
  handleMouseLeave(event) {
    this.setState({
      x: this.initX,
      y: this.initY,
      mouseEntered: false
    });
  }

  // note: color is random and changes every time state changes
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

// nav menu
class Nav extends Component {
  render() {
    return (
      <nav>
        <a href="https://linkedin.com/in/alectietjens" target="_">LinkedIn</a>
        <a href="https://github.com/alectietjens" target="_">GitHub</a>
        <a href="https://facebook.com/alec.tietjens" target="_">Facebook</a>
        <a href="mailto:alec@tietjens.com">Email</a>
        <a href="http://tietjens.com/AlecTietjensResume.pdf" target="_">Résumé</a>
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