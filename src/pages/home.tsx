import { FC, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/pages/home.css";
import { motion } from "framer-motion";
import axios from "axios";
import Error from "../components/modal/error";
import AnimatedPresenseFix from "../components/animatedPresenseFix";
import Loading from "../components/loading";
import Card from "../components/card";
import { dataType } from "../lib/types";

interface Props {}

const Home: FC<Props> = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [DATA, setData] = useState<dataType>({
    id: "",
    error: false,
    image_cover: "",
    title: "",
    artist: "",
    language: "",
    page: "",
    tags: [],
  });

  const [error, setError] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const readOnly = () => {
    if (value.trim().length > 0)
      window.open(`https://nhentai.net/g/${value}/1`, "_blank");
  };

  const fetchApi = async () => {
    const id = value.trim();

    if (id.length === 0) return;

    setLoading(true);

    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL!, {
        id,
      });

      setData(data);

      !cardVisible && setCardVisible(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="home_container">
        <div className="box">
          <div className="tagline">
            <h1>Easiest way to use nhentai</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="form">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
            />

            <div className="buttons">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={fetchApi}
              >
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
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                See Information
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={readOnly}
              >
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Read Only
              </motion.button>
            </div>
          </form>
          <AnimatedPresenseFix>{loading && <Loading />}</AnimatedPresenseFix>

          {cardVisible && <Card data={DATA} />}
        </div>
      </div>

      <AnimatedPresenseFix>
        {error && <Error handleClose={() => setError(false)} />}
      </AnimatedPresenseFix>

      <Footer />
    </>
  );
};

export default Home;
