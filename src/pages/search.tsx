import axios from "axios";
import { FC, useState } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Footer from "../components/footer";
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import Filters from "../components/filters";
import Card from "../components/searchCard";

// redux
import { CHANGE_PAGE } from "../redux/reducers/selectedPageReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SET_DATA, VISIBLE } from "../redux/reducers/searchDataReducer";
import { SET_INPUT } from "../redux/reducers/searchInputReducer";
import { SET_FILTER_DATA } from "../redux/reducers/filterDataReducer";

// styles
import "../styles/pages/search.css";

const Search: FC = () => {
  const value = useAppSelector((state) => state.SEARCH_INPUT);
  const { isVisible, artistName, page, data } = useAppSelector(
    (state) => state.SEARCH_DATA
  );
  const { language } = useAppSelector((state) => state.FILTER_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [filterShow, setFilterShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchApi = (e: any) => {
    e.preventDefault();
    dispatch(CHANGE_PAGE(1));
    callApi(1, value);
  };

  const callApi = async (p: number, name?: string) => {
    if (!name) name = artistName.replaceAll(" ", "-");

    setLoading(true);

    try {
      const URL = `${process.env.REACT_APP_API_URL}/search?page=${p}`;
      const { data } = await axios.post(URL, {
        name: name,
      });
      dispatch(
        SET_DATA({
          data: data.data,
          artistName: value,
          page: data.pagination,
        })
      );
      dispatch(SET_FILTER_DATA({ data: data.data, lang: "all" }));
      dispatch(CHANGE_PAGE(p));
      !isVisible && dispatch(VISIBLE());
      error && setError(false);
    } catch (err) {
      setError(true);
      console.log("error = ", err);
    }
    setLoading(false);
  };

  const filter = (e: any) => {
    const lang = e.target.value;

    if (lang === "all") {
      dispatch(SET_FILTER_DATA({ data: data, lang }));
      return;
    }

    const filterData = data.filter(
      (d: any) => d.language.toLocaleLowerCase() === lang
    );

    dispatch(SET_FILTER_DATA({ data: filterData, lang }));
  };

  return (
    <>
      <Navbar />

      <main className="search_container">
        <div className="box">
          <div className="tagline">
            <h1>Advance search</h1>
          </div>

          <form onSubmit={fetchApi} className="form">
            <div className="form_input">
              <input
                type="text"
                onChange={(text) => dispatch(SET_INPUT(text.target.value))}
                placeholder="Enter Artist Name"
                value={value}
                className="input"
                required
              />
              <button type="submit" className="btn">
                search
              </button>
            </div>
            <div className="filter_container">
              <button
                type="button"
                className="icon"
                onClick={() => setFilterShow(!filterShow)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <p>Filter</p>
              </button>

              {/* filters */}
              <AnimatePresence>
                {filterShow && <Filters language={language} filter={filter} />}
              </AnimatePresence>
            </div>
          </form>
        </div>
        {loading && <Loading />}
        {error && <h2>Not Found!</h2>}
        {isVisible && (
          <Card page={page} callApi={callApi} artistName={artistName} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Search;
