import React from "react";
import Svg, { Path } from "react-native-svg";
function SkipFrontIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-skip-forward"
      {...props}
    >
      <Path d="m5 4 10 8-10 8V4zM19 5v14" />
    </Svg>
  );
}

export default SkipFrontIcon;
