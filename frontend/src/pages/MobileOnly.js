import Lottie from "react-lottie";
import * as cat from "../assets/cat.json";
import * as bee from "../assets/bee.json";

const MobileOnly = (props) => {
  const defaultOptionsCat = {
    loop: true,
    autoplay: true,
    animationData: cat.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMax slice",
    },
  };

  const defaultOptionsBee = {
    loop: true,
    autoplay: true,
    animationData: bee.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "80%",
        borderRadius: "10px",
        overflow: "auto",
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
        Uh Oh!
      </p>
      <Lottie
        options={defaultOptionsCat}
        height={150}
        width={280}
        style={{ margin: "10px 0" }}
      />

      <p style={{ textAlign: "center" }}>
        This experiment was designed to be viewed on a larger screen. Please try
        again on a laptop / desktop.
      </p>

      <a
        href="https://www.appopener.com/yt/1v262p16l"
        style={{ position: "fixed", bottom: 0, right: 0 }}
      >
        <Lottie options={defaultOptionsBee} height={80} width={80} />
      </a>
    </div>
  );
};

export default MobileOnly;
