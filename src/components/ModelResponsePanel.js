import React from "react";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";

const ModelResponsePanel = ({ modelName, response, isLoading }) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", height: "200px", position: "relative" }}
    >
      <Typography variant="h6" gutterBottom>
        {modelName}
      </Typography>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <CircularProgress />
        </Box>
      ) : response ? (
        <Typography>{response}</Typography>
      ) : (
        <Typography style={{ color: "#aaa" }}>No response yet</Typography>
      )}
    </Paper>
  );
};

export default ModelResponsePanel;
