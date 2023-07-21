import { useEffect, useContext } from "react";

import { UserContext } from "../App";

const NotFound = () => {
  const { stopTimer } = useContext(UserContext);
  useEffect(() => stopTimer(), []);
  return (
    <div
      style={{
        margin: "auto 0",
      }}
    >
      Error 404 - Not Found
    </div>
  );
};
export default NotFound;
