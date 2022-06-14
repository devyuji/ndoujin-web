import type { FC, FormEventHandler } from "react";
import { useEffect, useRef, useState } from "react";
import "../styles/pages/home.css";
import axios from "axios";
import Error from "../components/modal/error";
import AnimatedPresenseFix from "../components/animatedPresenseFix";
import Loading from "../components/loading";
import Card from "../components/card";
import Button from "../components/button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  toggleLoading,
  toggleError,
  showCard,
  setSaved,
} from "../redux/reducers/homeState";
import { add } from "../redux/reducers/doujinData";
import { useSearchParams } from "react-router-dom";
import { saveHistory } from "../lib/history";

interface Props {}

const Home: FC<Props> = () => {
  const [value, setValue] = useState("");
  const { loading, cardVisible, error } = useAppSelector(
    (state) => state.homeState
  );
  const buttonRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const [query] = useSearchParams();

  useEffect(() => {
    console.log("rendering");
    const code = query.get("code");

    if (code != null) {
      setValue(code);
      buttonRef.current?.focus();
    }
  }, [query]);

  const read = () => {
    if (value.trim().length > 0) {
      saveHistory(value);

      window.open(`https://nhentai.net/g/${value}/1`, "_blank");
    }
  };

  const fetchApi: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("calling");

    const id = value.trim();

    if (id.length === 0) return;

    dispatch(toggleLoading());

    try {
      const { data } = await axios.post(process.env.REACT_APP_API_URL!, {
        id,
      });

      dispatch(setSaved(isSaved(data.id)));

      dispatch(add(data));

      !cardVisible && dispatch(showCard());

      setValue("");
    } catch (err) {
      console.error(err);

      dispatch(toggleError());
    }

    dispatch(toggleLoading());
  };

  const isSaved = (id: string) => {
    console.log("isaved function running");
    let saved: any = localStorage.getItem("saved");
    saved = JSON.parse(saved);

    const found = saved.find((element: any) => element.id === id);

    if (found) return true;

    return false;
  };

  return (
    <>
      <div className="home_container">
        <div className="box">
          <div className="tagline">
            <h1>Easiest way to use nhentai</h1>
          </div>

          <form onSubmit={fetchApi} className="form">
            <input
              ref={buttonRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              required
            />

            <div className="buttons">
              <Button type="submit">
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
              </Button>

              <Button type="button" onClick={read}>
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
                Read
              </Button>
            </div>
          </form>

          <AnimatedPresenseFix>{loading && <Loading />}</AnimatedPresenseFix>

          {cardVisible && <Card />}
        </div>
      </div>

      <AnimatedPresenseFix>
        {error && <Error handleClose={() => dispatch(toggleError())} />}
      </AnimatedPresenseFix>
    </>
  );
};

export default Home;
