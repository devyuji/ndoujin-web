import { FC, useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/pages/home.css";

// components
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Loading from "../components/loading";

// redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RESET_DATA, SET_DATA } from "../redux/reducers/dataReducer";
import { CLEAR_INPUT, SET_INPUT } from "../redux/reducers/inputReducer";
import { START_LOADING, STOP_LOADING } from "../redux/reducers/loadingReducer";
import { HIDE_CARD, SHOW_CARD } from "../redux/reducers/cardVisibleReducer";

const Home: FC = () => {
  const value = useAppSelector((state) => state.INPUT);
  const DATA = useAppSelector((state) => state.DATA);
  const isCardVisible = useAppSelector((state) => state.IS_CARD_VISIBLE);
  const loading = useAppSelector((state) => state.LOADING);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
    if (value) buttonRef.current?.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApi = async (e: any) => {
    e.preventDefault();
    if (value) {
      dispatch(START_LOADING());
      const id = value.trim();
      try {
        const { data } = await axios.post(process.env.REACT_APP_API_URL!, {
          id,
        });
        setError(false);
        dispatch(SET_DATA(data));
        !isCardVisible && dispatch(SHOW_CARD());
        dispatch(CLEAR_INPUT());
      } catch (err) {
        console.error("error = ", err);
        dispatch(RESET_DATA());
        dispatch(HIDE_CARD());

        setError(true);
      }
      dispatch(STOP_LOADING());
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
              onChange={(text) => dispatch(SET_INPUT(text.target.value))}
            />
            <button type="submit" ref={buttonRef}>
              go
            </button>
          </form>
        </div>
        {loading && <Loading />}
        {isCardVisible && (
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
