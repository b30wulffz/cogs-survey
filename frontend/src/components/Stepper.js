import { useEffect, useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { useLocation } from "react-router-dom";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveStep(1);
        break;
      case "/questionnaire":
        setActiveStep(2);
        break;
      case "/finish-survey":
        setActiveStep(3);
        break;
      default:
        setActiveStep(0);
    }
  }, [location]);

  return (
    <MobileStepper
      variant="progress"
      steps={4}
      position="static"
      activeStep={activeStep}
      sx={{
        boxSizing: "border-box",
        width: "70%",
        position: "fixed",
        bottom: "15px",
        background: "rgba(204, 204, 204, 0.2)",
        padding: "20px",
        borderRadius: "60px",
        flexGrow: 1,
        justifyContent: "center",
      }}
    />
  );
};

export default Stepper;
