import { FC, useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/pages/home.css";

// components
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Loading from "../components/loading";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  CARD_SHOW_ACTION,
  DATA_ACTION,
  LOADING_ACTION,
  USER_INPUT_ACTION,
} from "../redux/action";

const Home: FC = () => {
  const value = useSelector((s: any) => s.USER_INPUT);
  const DATA = useSelector((s: any) => s.DATA);
  const show = useSelector((s: any) => s.SHOW);
  const loading = useSelector((s: any) => s.LOADING);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchApi = async (e: any) => {
    e.preventDefault();
    if (value) {
      dispatch(LOADING_ACTION(true));
      const id = value.trim();
      try {
        const { data } = await axios.post(process.env.REACT_APP_API_URL!, {
          id,
        });
        setError(false);
        dispatch(DATA_ACTION(data));
        !show && dispatch(CARD_SHOW_ACTION(true));
        dispatch(USER_INPUT_ACTION(""));
      } catch (err) {
        console.error("error = ", err);
        dispatch(DATA_ACTION({}));
        dispatch(CARD_SHOW_ACTION(false));

        setError(true);
      }
      dispatch(LOADING_ACTION(false));
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
              ref={inputRef}
              type="number"
              placeholder="e.g. #123456"
              value={value}
              onChange={(text) =>
                dispatch(USER_INPUT_ACTION(text.target.value))
              }
            />
            <button type="submit">go</button>
          </form>
        </div>
        {loading && <Loading />}
        {show && (
          <>
            <p className="code">#{DATA.id}</p>
            <Card data={DATA} />
          </>
        )}
        {error && <h2>Not Found!</h2>}
      </main>

      <Footer />
    </>
  );
};

export default Home;
