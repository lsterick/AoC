import React, { useState } from "react";
import day from "./day10";
import "./App.css";

interface State {
  input: string;
  output: string;
}

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Output will be here")


  return (
    <div className="App">
      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button
        onClick={(event) => {
          setOutput(day(input));
        }}
      >
        Process Input
      </button>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
