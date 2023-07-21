import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Begin Survey",
  "Instructions",
  "Target Content",
  "Questionnaire",
  "Finish Survey",
];

const Stepper = () => {
  return (
    <Box
      sx={{
        width: "70%",
        position: "absolute",
        bottom: "5px",
        background: "rgba(204, 204, 204, 0.2)",
        padding: "10px",
        borderRadius: "60px",
      }}
    >
      <Stepper alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Stepper;
