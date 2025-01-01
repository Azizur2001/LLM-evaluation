import React from "react";
import { TextField, Button, Box } from "@mui/material";

const PromptInput = ({ prompt, setPrompt, handleSubmit }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      marginTop={3}
    >
      <TextField
        label="Enter your prompt"
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "70%" }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PromptInput;
