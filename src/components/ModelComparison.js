import React, { useState, useEffect } from "react";
import PromptInput from "./PromptInput";
import ModelResponsePanel from "./ModelResponsePanel";
import { Grid } from "@mui/material";

const ModelComparison = () => {
  const [prompt, setPrompt] = useState(""); // User's prompt
  const [responses, setResponses] = useState([]); // Model responses
  const [loading, setLoading] = useState([]); // Loading state for each model
  const [models, setModels] = useState([]); // List of models

  // Fetch available models from the backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:5001/models");
        const data = await response.json();
        setModels(data); // Set the models in state
        setResponses(Array(data.length).fill(null)); // Initialize responses array
        setLoading(Array(data.length).fill(false)); // Initialize loading states
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  // Fetch response for a specific model
  const fetchModelResponse = async (model, index) => {
    setLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = true;
      return newLoading;
    });

    try {
      const response = await fetch("http://localhost:5001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model.id, prompt }),
      });

      const data = await response.json();
      setLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });

      setResponses((prev) => {
        const newResponses = [...prev];
        newResponses[index] = data.response;
        return newResponses;
      });
    } catch (error) {
      console.error("Error fetching model response:", error);
      setLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });

      setResponses((prev) => {
        const newResponses = [...prev];
        newResponses[index] = `Error fetching response for ${model.name}`;
        return newResponses;
      });
    }
  };

  // Handle prompt submission
  const handleSubmit = () => {
    models.forEach((model, index) => fetchModelResponse(model, index));
  };

  return (
    <div>
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
      />
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {models.map((model, index) => (
          <Grid item xs={12} md={4} key={model.id}>
            <ModelResponsePanel
              modelName={model.name}
              response={responses[index]}
              isLoading={loading[index]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ModelComparison; // export
