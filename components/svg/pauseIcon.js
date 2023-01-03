import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PauseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-pause"
    {...props}
  >
    <Path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </Svg>
);

export default PauseIcon;
