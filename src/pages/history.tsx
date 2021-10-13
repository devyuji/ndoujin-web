import { FC, useEffect, useRef, useState } from "react";
import "../styles/pages/history.css";

// components
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Back from "../components/back";

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
        <Back />

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
