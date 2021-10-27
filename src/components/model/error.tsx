import { FC } from "react";
import Model from ".";
import "../../styles/component/model/error.css";

interface ErrorProps {
  handleClose: () => void;
}

const Error: FC<ErrorProps> = ({ handleClose }) => {
  return (
    <Model handleClose={handleClose}>
      <p className="error_message">UH-OH 🙀</p>
      <p className="error_message">Something went wrong!</p>
      <button type="button" className="try_again" onClick={handleClose}>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 4 1 10 7 10"></polyline>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
        Try Again
      </button>
    </Model>
  );
};

export default Error;
