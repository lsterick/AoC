import React, { Component } from "react";
import day from "./day4b.js";
import "./App.css";

interface State {
  input: string;
  output: string;
}

class App extends Component<{}, State> {
  state: State = {
    input: "",
    output: "Output will be here"
  };

  render() {
    return (
      <div className="App">
        <textarea
          value={this.state.input}
          onChange={event => {
            this.setState({ input: event.target.value });
          }}
        />
        <button
          onClick={event => {
            this.setState({ output: day(this.state.input) });
          }}
        >
          Process Input
        </button>
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
