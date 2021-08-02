import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root')

class Title extends React.Component {
  render() {
    return (
        <p>Hello there!</p>
    );
  }
}

class Intro extends React.Component {
  render() {
    return (
        <p>welcome there friend</p>
    );
  }
}

function LocationForm(props) {
  return (
    <div>
        <label>
          Location:
          <input type="text" />
        </label>
        <label>
          Distance:
          <select>
            <option value="10mi">10mi</option>
            <option value="15mi">15mi</option>
            <option value="20mi">20mi</option>
          </select>
        </label>
        <button onClick={props.onClick}>
          Submit
        </button>
      </div>
  );
}

function RepeatButton(props) {
  return (
    <button 
      aria-label='Play again.' 
      id='repeatButton' 
      onClick={props.onClick}>
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick() { 
    this._child1.forceUpdateHandler();
  }


  render() {
    let repeatButton = null
    repeatButton = <RepeatButton onClick={this.handleClick} />

    let locationForm = null
    locationForm = <LocationForm onClick={this.handleClick} />

    return (
      <div>
        <Title />
        <Intro />
        {locationForm}
        <div className={`spinner-container`}>
          <Spinner  ref={(child) => { this._child1 = child; }} timer="1000" />
          <div className="gradient-fade"></div>
        </div>
        {repeatButton}          
      </div>
    );
  }
}  
  
class Spinner extends React.Component {  
  constructor(props){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    this.reset();
  }; 

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer        
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);      
  }

  state = {
    position: 0,
    lastPosition: null
  }
  static iconHeight = 188;
  multiplier = Math.floor(Math.random()*(4-1)+1);

  start = this.setStartPosition();
  speed = Spinner.iconHeight * this.multiplier;    

  setStartPosition() {
    return ((Math.floor((Math.random()*9))) * Spinner.iconHeight)*-1;
  }

  moveBackground() {
    this.setState({ 
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 9;
    const maxPosition = (Spinner.iconHeight * (totalSymbols-1)*-1);
    let moved = (this.props.timer/100) * this.multiplier
    let startPosition = this.start;
    let currentPosition = startPosition;    

    for (let i = 0; i < moved; i++) {              
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);        
      this.getSymbolFromPosition();    

    } else {
      this.moveBackground();
    }      
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  render() {
    let { position, current } = this.state;   

    return (            
      <div 
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}          
      />
    )
  }
}

function runApp() {
  ReactDOM.render(
    <App />,
    rootElement
  )
}
  
runApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
