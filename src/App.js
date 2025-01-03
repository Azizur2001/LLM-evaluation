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
