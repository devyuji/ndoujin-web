import { FC, useState } from "react";
import axios from "axios";
import "../styles/pages/home.css";

// components
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// redux
import { useDispatch, useSelector } from "react-redux";
import { CARD_SHOW_ACTION, DATA_ACTION } from "../redux/action";

const Home: FC = () => {
  const [value, setValue] = useState("");
  const DATA = useSelector((s: any) => s.DATA);
  const show = useSelector((s: any) => s.SHOW);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const fetchApi = async (e: any) => {
    e.preventDefault();
    if (value) {
      setLoading(true);
      const id = value.trim();
      try {
        const { data } = await axios.post(process.env.REACT_APP_API_URL!, {
          id,
        });
        setError(false);
        dispatch(DATA_ACTION(data));
        !show && dispatch(CARD_SHOW_ACTION(true));
      } catch (err) {
        console.error("error = ", err);
        dispatch(DATA_ACTION({}));
        dispatch(CARD_SHOW_ACTION(false));

        setError(true);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="home_container">
        <div className="box">
          <div className="tagline">
            <h1>Easiest way to find nhentai</h1>
          </div>
          <form onSubmit={fetchApi} className="form">
            <input
              type="number"
              placeholder="e.g. #123456"
              value={value}
              onChange={(text) => setValue(text.target.value)}
            />
            <button type="submit">go</button>
          </form>
        </div>
        {loading && <h2>loading...</h2>}
        {show && <Card data={DATA} />}
        {error && <h2>Not Found!</h2>}
      </main>

      <Footer />
    </>
  );
};

export default Home;
