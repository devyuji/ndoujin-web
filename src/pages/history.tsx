import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/history.css";

// components
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const History: FC = () => {
  const lists = useRef<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    lists.current = localStorage.getItem("history");
    const a = JSON.parse(lists.current);
    a.reverse();
    lists.current = a;
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      {/* body  */}
      <div className="history_container">
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

        <div className="content">
          {lists.current.map((list: any, index: number) => (
            <div className="box" key={index}>
              <a
                href={`https://nhentai.net/g/${list}/1`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {list}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default History;
