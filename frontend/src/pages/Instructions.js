import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { UserContext } from "../App";

const Instructions = (props) => {
  let navigate = useNavigate();

  const moveNext = () => {
    navigate("/questionnaire");
  };

  const { stopTimer } = useContext(UserContext);
  useEffect(() => {
    stopTimer();
    // const userData = JSON.parse(localStorage.getItem("userData"));
    // if (!userData || userData.user_id === "") {
    //   navigate("/");
    //   return;
    // }
  }, []);

  return (
    <div
      style={{
        height: "80vh",
        width: "80%",
        borderRadius: "10px",
        overflow: "auto",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        margin: "auto 0",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "auto 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
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
          Instructions
        </p>

        <p
          style={{
            color: "rgb(145,163,176)",
            padding: "15px 0",
          }}
        >
          Go through the steps below to get started.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "60%",
          }}
        >
          <Alert severity="success" sx={{ margin: "10px 0" }}>
            On the next page, you will be given a caption and two images. 
          </Alert>
          <Alert severity="success" sx={{ margin: "10px 0" }}>
            Select the image which correlates best with the caption. 
          </Alert>
        </div>
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
          Agree and Continue
        </Button>
      </div>
    </div>
  );
};

export default Instructions;
