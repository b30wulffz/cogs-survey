import "./App.css";

import { useState, createContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";

import * as loader from "./assets/loader.json";
import DetailsForm from "./pages/DetailsForm";
import Instructions from "./pages/Instructions";
import Questionnaire from "./pages/Questionnaire";
import FinishSurvey from "./pages/FinishSurvey";
import NotFound from "./pages/NotFound";
import MobileOnly from "./pages/MobileOnly";
import Loader from "./components/Loader";
import Stepper from "./components/Stepper";

export const UserContext = createContext();

const DisplayContent = () => {
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "auto",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isMobile ? (
        <MobileOnly />
      ) : (
        <>
          <Outlet />
          <Stepper />
        </>
      )}
    </div>
  );
};

const App = () => {
  const [timer, setTimer] = useState(null);
  const startTimer = () => {
    setTimer(
      setInterval(() => {
        const timeSpent = localStorage.getItem("timeSpent");
        if (timeSpent === null) localStorage.setItem("timeSpent", 0);
        else localStorage.setItem("timeSpent", parseInt(timeSpent) + 1);
      }, 1000)
    );
  };
  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        startTimer,
        stopTimer,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Loader loader={loader}>
              <DisplayContent />
            </Loader>
          }
        >
          <Route index element={<DetailsForm />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="finish-survey" element={<FinishSurvey />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
