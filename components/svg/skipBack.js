import React from "react";
import Svg, { Path } from "react-native-svg";
function SkipBackIcon(props) {
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
      className="feather feather-skip-back"
      {...props}
    >
      <Path d="M19 20 9 12l10-8v16zM5 19V5" />
    </Svg>
  );
}

export default SkipBackIcon;
