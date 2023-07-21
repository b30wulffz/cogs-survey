import { QuestionAnswerRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";


const Mcq = (props) => {
  const [option, setOption] = useState(props.value);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    props.setValue(option);
  }, [option]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        margin: "20px 0",
        flexWrap: "wrap",
      }}
    >
      {data.map((answer, index) => (
        <div
          style={{
            borderRadius: "10px",
            // border: "2px solid rgb(59, 175, 159)",
            padding: "10px",
            // width: "48%",
            boxSizing: "border-box",
            margin: "5px",
            textAlign: "center",
            cursor: "pointer",
            color: option == answer ? "white" : "rgb(59, 175, 159)",
            backgroundColor: option == answer ? "rgb(59, 175, 159)" : "",
            fontWeight: "bold",
          }}
          onClick={() => setOption(answer)}
          key={answer}
        >
          <img src={`http://localhost:2000/image/${answer}`} 
            style={{
              border:"2px solid white",
              borderRadius: "10px",
              height: "200px"
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Mcq;
