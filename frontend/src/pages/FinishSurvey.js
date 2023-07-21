import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import { UserContext } from "../App";

const FinishSurvey = (props) => {
  let navigate = useNavigate();

  const moveNext = () => {
    window.location = "mailto:shlokp@adobe.com";
  };

  const { stopTimer } = useContext(UserContext);
  useEffect(() => {
    stopTimer();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || userData.user_id === "") {
      navigate("/");
      return;
    }
    localStorage.clear();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "80%",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto 0",
      }}
    >
      <p
        style={{
          color: "#3BAF9F",
          fontSize: "3rem",
          margin: "10px 0",
          fontWeight: "bold",
        }}
      >
        Thank you for completing the survey!
      </p>

      <p
        style={{
          color: "rgb(145,163,176)",
          padding: "15px 0",
        }}
      >
        Now you can close the browser window.
      </p>

      <Button
        variant="contained"
        sx={{
          padding: "15px 20px",
          borderRadius: "30px",
          width: "300px",
          margin: "20px 0",
        }}
        onClick={() => moveNext()}
      >
        Email Us
      </Button>
    </div>
  );
};

export default FinishSurvey;
