import { useState, useEffect, useContext } from "react";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { UserContext } from "../App";


const DetailsForm = (props) => {
  const [email, setEmail] = useState();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { stopTimer } = useContext(UserContext);
  useEffect(() => stopTimer(), []);

  const moveNext = () => {
    setLoading(true);
    axios
      .post("http://localhost:2000/register", {
        email: email,
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("timeSpent", 0);
        setLoading(false);
        navigate("/questionnaire");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "80%",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        margin: "auto 0",
      }}
    >
      <div
        style={{
          flex: 2,
          background: "#3BAF9F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
          }}
        >
          Survey
        </h1>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AccessTimeFilledIcon style={{ marginRight: "5px" }} />
          3 - 4 minutes
        </p>
        <p>
          This survey will help us to gather data about your observations. We
          will not share your information with anyone.
        </p>
      </div>
      <div
        style={{
          flex: 5,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              background: "rgba(0, 0, 0, 0.05)",
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
          Enter your details
        </p>

        {/* <p
          style={{
            color: "rgb(145,163,176)",
            padding: "15px 0",
          }}
        >
          Your identity will be kept anonymous.
        </p> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
          }}
        >
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            InputProps={{ disableUnderline: true }}
            className="inputbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          disabled={!email}
        >
          Begin Survey
        </Button>
      </div>
    </div>
  );
};

export default DetailsForm;
