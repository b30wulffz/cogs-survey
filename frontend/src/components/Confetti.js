import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const CustomConfetti = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      gravity={0.15}
      colors={["#fff", "#CBDDF8"]}
      //   wind={0.01}
      drawShape={(ctx) => {
        const numPoints = 8;
        const innerRadius = 2 * 0.2;
        const outerRadius = 2 * 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0 - outerRadius);

        for (let n = 1; n < numPoints * 2; n++) {
          const radius = n % 2 === 0 ? outerRadius : innerRadius;
          const x = radius * Math.sin((n * Math.PI) / numPoints);
          const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
          ctx.lineTo(x, y);
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }}
    />
  );
};

export default CustomConfetti;
