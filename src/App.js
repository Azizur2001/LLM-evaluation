// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import ModelComparison from "./components/ModelComparison";

function App() {
  return (
    <div style={{ fontFamily: "Roboto, sans-serif" }}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        LLM Evaluation Platform
      </h1>
      <ModelComparison />
    </div>
  );
}

export default App;
