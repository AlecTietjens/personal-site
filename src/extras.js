class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      interval: 1000
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.state.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange(event) {
    this.componentWillUnmount();
    this.setState({interval: event.target.value});
    this.timerID = setInterval(
      () => this.tick(),
      event.target.value
    );
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <input type="number" 
          value={this.state.interval}
          onChange={this.handleChange} />
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}