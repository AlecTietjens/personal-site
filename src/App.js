import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import logo from './logo.svg';
import './App.css';

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};

class Ball extends Component {
  constructor(props) {
    super(props);
    this.initX = parseInt(this.props.positionx);
    this.initY = parseInt(this.props.positiony);
    this.radius = parseInt(this.props.radius);
    this.zIndex = parseInt(this.props.zIndex);
    this.color = this.props.color;

    this.state = {
      x: this.initX,
      y: this.initY,
      mouseEntered: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(event) {
    this.setState({
      x: this.state.x + this.initX + this.radius - event.clientX,
      y: this.state.y + this.initY + this.radius - event.clientY,
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
    if(this.state.mouseEntered) {
      style = {
        translateX: spring(this.state.x, springSetting1),
        translateY: spring(this.state.y, springSetting1),
        scale: spring(1, springSetting1),
        boxShadow: spring((this.state.x / 10 - (3 * this.radius*2 - 50) / 2) / 15, springSetting1),
      }
    }
    else {
      style = {
        translateX: spring(this.state.x, springSetting2),
        translateY: spring(this.state.y, springSetting2),
        scale: spring(1.2, springSetting2),
        boxShadow: spring((this.state.x / 10- (3 * this.radius*2 - 50) / 2) / 15, springSetting1)
      }
    }
    return (
      <div style={{left: this.initX, top: this.initY}}>
        <Motion style={style}> 
          {({translateX, translateY, scale, boxShadow}) =>
            <div onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              style={{backgroundColor: this.color,
                  width: `${this.radius*2}px`,
                  height: `${this.radius*2}px`,
                  WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
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

const balls = [
  // a
  {
    x: window.innerWidth*.05,
    y: window.innerHeight*.55,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.064,
    y: window.innerHeight*.49,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  }, 
  {
    x: window.innerWidth*.09,
    y: window.innerHeight*.46,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.12,
    y: window.innerHeight*.48,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.132,
    y: window.innerHeight*.53,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  }, 
  {
    x: window.innerWidth*.118,
    y: window.innerHeight*.585,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.09,
    y: window.innerHeight*.615,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.065,
    y: window.innerHeight*.6,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.145,
    y: window.innerHeight*.61,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  // l
  {
    x: window.innerWidth*.215,
    y: window.innerHeight*.608,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.202,
    y: window.innerHeight*.543,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.198,
    y: window.innerHeight*.48,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.198,
    y: window.innerHeight*.41,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.198,
    y: window.innerHeight*.35,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.199,
    y: window.innerHeight*.29,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  // e
  {
    x: window.innerWidth*.28,
    y: window.innerHeight*.533,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.29,
    y: window.innerHeight*.48,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.315,
    y: window.innerHeight*.46,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.341,
    y: window.innerHeight*.482,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.337,
    y: window.innerHeight*.533,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.31,
    y: window.innerHeight*.545,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.285,
    y: window.innerHeight*.585,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.31,
    y: window.innerHeight*.623,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.343,
    y: window.innerHeight*.618,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  // c
  {
    x: window.innerWidth*.41,
    y: window.innerHeight*.52,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.421,
    y: window.innerHeight*.474,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.4435,
    y: window.innerHeight*.45,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.464,
    y: window.innerHeight*.483,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.4145,
    y: window.innerHeight*.573,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.435,
    y: window.innerHeight*.61,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },
  {
    x: window.innerWidth*.4625,
    y: window.innerHeight*.607,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },/** 
  {
    x: window.innerWidth*.484,
    y: window.innerHeight*.587,
    radius: randomRadius(),
    color: randomColor(),
    zIndex: randomZindex()
  },*/
]

class App extends Component {
  render() {
    return (
      <div className="App">
      {balls.map((ball) =>
        <Ball radius={ball.radius} positionx={ball.x}
            positiony={ball.y}
            color={randomColor()} 
            zIndex={ball.zIndex} />
      )}
      </div>
    );
  }
}

export default App;


//------------ UTILITIES -------------
function randomColor() {
  const allColors = [
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
  ]
  const allColors2 = [
    '#249E86', '#109177', '#0E705D', '#065848', '#00352B', '#6232A9', '#4F1D9A',
    '#3F1878', '#2E0E5E', '#190438', '#F8E438', '#E2CE19', '#B0A016', '#8A7D09',
    '#534B00', '#F88438', '#E26819', '#B05316', '#8A3C09', '#532100'
  ]
  const allColors3 = [
    '#109177', '#4F1D9A', '#E2CE19', '#E26819'
  ]
  let min = Math.ceil(0);
  let max = Math.floor(allColors3.length);
  return allColors3[Math.floor(Math.random() * (max - min)) + min];
}

function randomZindex() {
  let min = Math.ceil(0);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomRadius() {
  let min = Math.ceil(Math.floor(window.innerHeight*.0215));
  let max = Math.floor(window.innerHeight*.0335);
  return Math.floor(Math.random() * (max - min)) + min;
}