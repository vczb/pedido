import { SVGAttributes } from "react";

type MinusProps = SVGAttributes<HTMLOrSVGElement>;

const Minus = ({ ...props }: MinusProps) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      clipRule="evenodd"
      d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
      fill="currentColor"
      fillRule="evenodd"
    ></path>
  </svg>
);

export default Minus;