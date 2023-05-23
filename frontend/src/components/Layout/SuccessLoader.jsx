import { useLottie } from "lottie-react";
import animationData from "../../Assests/animations/107043-success.json";

const SuccessLoader = () => {
  const options = {
    animationData: animationData,
    loop: false,
    // autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="relative w-full " style={{ top: "-100px" }}>
      <div className="-z-20 overflow-hidden h-[500px] flex justify-center">
        <div style={{ width: "700px", height: "200px" }}>{View}</div>
      </div>
    </div>
  );
};

export default SuccessLoader;
