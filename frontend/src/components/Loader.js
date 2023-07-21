import { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const Loader = (props) => {
  const [loading, setLoading] = useState(true);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.loader.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FadeIn>
        <div>
          <Lottie options={defaultOptions} height={320} width={320} />
        </div>
      </FadeIn>
    </div>
  ) : (
    <FadeIn>{props.children}</FadeIn>
  );
};

export default Loader;
