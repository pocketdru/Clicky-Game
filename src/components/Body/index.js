import React, { Component } from "react";
import data from "../../friends.json"; 

// By extending the React.Component class, Counter inherits functionality from it
class Counter extends Component {
  // Setting the initial state of the Counter component
  state = {
    dataCopy: [],
    trackerObj: {},
    count: 0,
    topScore: 0
  };

componentDidMount() {
  this.setState({
    dataCopy: data,
    trackerObj: this.turnToObject(data)
  });
}

shuffleData = () => {
  let dc = this.state.dataCopy;
  let i = dc.length - 1;
  while(i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = dc[i];
    dc[i] = dc[j];
    dc[j] = temp;
    i--;
  }
  return dc;
}

handleGuess = event => {
  this.handleClick(event) === false
    ? this.handleRightGuess(event)
    : this.hadleWrongGuess();
};

handleClick = event => {
  var watchBool = this.state.trackerObj;
  var thisId = event.target.id;
  if (watchBool[thisId] === false) {
    return false;
  } else {
    return true;
  }
}

handleRightGuess = event => {
  var thisId = parseInt(event.target.id);
  var trackerObjCopy = this.state.trackerObj;
  var currentCount = this.state.count;
  trackerObjCopy[thisId] = true;
   // update state to keep tracking and score, shuffle elements
   this.setState({
     trackerObj: trackerObjCopy,
     dataCopy: this.shuffleData(this.state.dataCopy),
     count: currentCount + 1
   },
   this.newTopScore
   );
};

hadleWrongGuess = () => {
  this.setState({
    trackerObj: this.turnToObject(this.state.dataCopy),
    count: 0
  });
  console.log("--- Gave over ---");
};

newTopScore = () => {
  var top = this.state.topScore;
  var currentCount = this.state.count;
  if (currentCount > top) {
    this.setState({ topScore: currentCount}, () => 
    console.log("--- New top score: " + this.state.topScore + ". ---"));
  } else {
    console.log("--- Top score: " + top + ". ---");
  }
}

turnToObject = array => {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    obj[array[i].id] = array[i].clicked;
  }
  console.log(obj);
  return obj;
}

render() {
  return (
    <div>
      <nav className="navbar">
        <p className="card-text">Click Count: {this.state.count}</p>
        <p className="card-text">High Score: {this.state.topScore}</p>
      </nav>
      <header className="header">
        <h1>Clicky Game!</h1>
        <h2>Click on an image to earn points, but don't click on any more than once!</h2>
      </header>
      <div className="container">
        {
          this.state.dataCopy &&
            this.state.dataCopy.map(item => {
              return (
                <div ria-label="click item" className="click-item" key={item.id}>
                  <img 
                    key={item.id + "i"}
                    id={item.id}
                    alt={item.clicked.toString()}
                    src={item.image}
                    onClick={event => this.handleGuess(event)}
                  />
                </div>
              );
            })
        }
        </div>
        <footer className="footer">
        </footer>
      </div>
    );
  };
}
export default Counter;