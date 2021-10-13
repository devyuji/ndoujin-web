import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/component/back.css";

const Back: FC = () => {
  return (
    <div className="back">
      <Link to="/">
        <svg
          height="50"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon_back"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </Link>
    </div>
  );
};

export default Back;
