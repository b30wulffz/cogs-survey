import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';


import Mcq from "../components/Mcq";
import { UserContext } from "../App";

function shuffleArray(arr) {
  const shuffledArray = arr.slice(); 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
  return shuffledArray;
}


const Questionaire = (props) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const moveNext = () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const timeSpent = localStorage.getItem("timeSpent");
    axios
      .post("http://localhost:2000/submit", {
        user_id: userData.user._id,
        answers: answers,
      })
      .then(() => {
        setLoading(false);
        navigate("/finish-survey");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { stopTimer } = useContext(UserContext);

  useEffect(() => {
    stopTimer();
    const userData = JSON.parse(localStorage.getItem("userData"));
    setQuestions(shuffleArray(userData.quiz))

    if (!userData || userData.user_id === "") {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    const ans = {};
    questions.forEach((q) => {
      ans[q.index] = -1;
    });
    setAnswers(ans);
  }, [questions]);

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "80%",
        borderRadius: "10px",
        overflow: "auto",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto 0",
      }}
    >
      {loading && (
        <div
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            position: "fixed",
            background: "rgba(0, 0, 0, 0.05)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <p
        style={{
          color: "#3BAF9F",
          fontSize: "3rem",
          margin: "10px 0",
          fontWeight: "bold",
        }}
      >
        Survey
      </p>
      <Alert severity="info" icon={false} sx={{textAlign: "center"}}>
        <AlertTitle>
          Click on the image that best matches the caption below. 
        </ AlertTitle>
        Even if neither of the images perfectly matches the caption, please choose the one that you find more closely related.
      </Alert>
        
     
      
      {/* // 4000: frontend 
      // 2000: backend */}

      <div
        style={{
          width: "100%",
        }}
      >
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              style={{
                margin: "20px 50px",
                padding: "20px 20px ",
                background: "rgba(0,0,0,0.03)",
                borderRadius: "10px",
                // display: "flex",
                // flexDirection: "column",

              }}
            >
              <div style={{ display: "flex", alignItems: "center", }}>
                <ArrowRightIcon
                  style={{
                    paddingRight: "10px",
                    color: "rgb(59, 175, 159)",
                    fontSize: "24px",
                  }}
                />
                <div style={{ fontSize: "1.4rem" }}>Caption: <span style={{fontWeight: "bolder"}}>{question.query}</span></div>
              </div>
              <div>
                  <Mcq data={shuffleArray([question.pos_img, question.neg_img])} 
                    value={answers[question.index]}
                    setValue={(val) => {
                      setAnswers({ ...answers, [question.index]: val });
                    }}
                  />
              </div>
            </div>
          );
        })}
      </div>
          
      {/* {Object.values(answers).includes(-1) && (<p
        style={{
          color: "red",
          padding: "5px 0",
          textAlign: "center"
        }}
      >
        </p>)
      }
       */}
      { Object.values(answers).includes(-1) && (
      <Alert severity="error" sx={{ margin: "5px 0" }}>
        Please answer all questions to finish the survey.
      </Alert>)}

      <Button
        variant="contained"
        sx={{
          padding: "15px 20px",
          borderRadius: "30px",
          width: "300px",
          margin: "20px 0",
        }}
        onClick={() => moveNext()}
        disabled={Object.values(answers).includes(-1)}
      >
        Finish Survey
      </Button>
    </div>
  );
};

export default Questionaire;
