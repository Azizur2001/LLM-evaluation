const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = 5001;

// Initialize GROQ SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the GROQ Backend! Available routes: /models and /generate"
  );
});

// Endpoint to fetch model response
app.post("/generate", async (req, res) => {
  const { model, prompt } = req.body;

  if (!model || !prompt) {
    return res.status(400).json({ error: "Model and prompt are required" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseContent =
      chatCompletion.choices[0]?.message?.content || "No response";
    res.json({ response: responseContent });
  } catch (error) {
    console.error("Error with GROQ API:", error);
    res.status(500).json({ error: "Failed to fetch response from GROQ API" });
  }
});
const stringSimilarity = require("string-similarity"); // Install with `npm install string-similarity`

// Updated Endpoint to fetch model response and calculate metrics
app.post("/generate", async (req, res) => {
  const { model, prompt } = req.body;

  if (!model || !prompt) {
    return res.status(400).json({ error: "Model and prompt are required" });
  }

  try {
    const startTime = Date.now(); // Start timer

    // Send the request to the GROQ API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const endTime = Date.now(); // End timer
    const responseTime = endTime - startTime; // Calculate response time

    // Extract the model's response
    const responseContent =
      chatCompletion.choices[0]?.message?.content || "No response";

    // Example expected response for accuracy calculation
    const expectedResponse = "Fast language models are important because...";
    const accuracy = calculateAccuracy(responseContent, expectedResponse);

    // Calculate relevancy as a placeholder (improve later with embeddings)
    const relevancy = calculateRelevancy(prompt, responseContent);

    // Send metrics and response back to the client
    res.json({
      response: responseContent,
      responseTime, // Time taken in milliseconds
      accuracy, // Accuracy as a percentage
      relevancy, // Relevancy as a percentage
    });
  } catch (error) {
    console.error("Error with GROQ API:", error);
    res.status(500).json({ error: "Failed to fetch response from GROQ API" });
  }
});

// Helper function to calculate accuracy using string similarity
const calculateAccuracy = (response, expectedResponse) => {
  const similarity = stringSimilarity.compareTwoStrings(
    response,
    expectedResponse
  );
  return Math.round(similarity * 100); // Return as percentage
};

// Placeholder helper function to calculate relevancy
const calculateRelevancy = (prompt, response) => {
  const similarity = stringSimilarity.compareTwoStrings(prompt, response);
  return Math.round(similarity * 100); // Return as percentage
};

app.get("/models", async (req, res) => {
  // This is static for now; you can replace it with a dynamic API call if needed
  const models = [
    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B Versatile" },
    { id: "llama-guard-3-8b", name: "llama guard 3-8b" },
    { id: "mixtral-8x7b-32768", name: "mixtral 8x7b 32768" },
  ];

  res.json(models);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
