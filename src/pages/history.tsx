import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/history.css";

interface Props {}

const History: FC<Props> = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    render();
  }, []);

  const render = () => {
    let history: any = localStorage.getItem("history");

    if (history !== null) {
      history = JSON.parse(history);

      setData(history.reverse());
    }
  };

  return (
    <div className="history-main">
      <div className="heading">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>

        <h1>History</h1>
      </div>

      <div className="history-container">
        {data.map((d, index) => (
          <div key={index} className="history-card">
            <Link to={`/?code=${d}`}>{d}</Link>
          </div>
        ))}
      </div>

      {data.length === 0 && <p>You haven't read anything.</p>}
    </div>
  );
};

export default History;
