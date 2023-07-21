import { useState, useEffect } from "react";

const Rating = (props) => {
  // make a 0 to 8 rating ui
  const [rating, setRating] = useState(props.value);

  useEffect(() => {
    props.setValue(rating);
  }, [rating]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        margin: "20px 0",
      }}
    >
      {[...Array(9)].map((value, index) => {
        return (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            key={index}
          >
            <div
              style={{
                borderRadius: "50%",
                border: "2px solid rgb(59, 175, 159)",
                fontWeight: "bold",
                cursor: "pointer",
                width: "60px",
                height: "60px",
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: rating == index ? "white" : "rgb(59, 175, 159)",
                backgroundColor: rating == index ? "rgb(59, 175, 159)" : "",
              }}
              onClick={() => setRating(index)}
            >
              {index}
            </div>
            {index == 0 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-23px",
                  fontSize: "13px",
                  color: "rgb(59, 175, 159)",
                }}
              >
                Less
              </div>
            )}
            {index == 8 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-23px",
                  fontSize: "13px",
                  color: "rgb(59, 175, 159)",
                }}
              >
                More
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
