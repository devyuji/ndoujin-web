import axios from "axios";
import { FC, useState } from "react";

// components
import Back from "../components/back";
import Footer from "../components/footer";
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import Card from "../components/searchCard";

// redux
import { useDispatch } from "react-redux";
import { SELECTED_PAGE_ACTION } from "../redux/action";

// styles
import "../styles/pages/search.css";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [language, setLanguage] = useState<String>("all");
  const [DATA, setData] = useState([]);
  const [realData, setRealData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [filterShow, setFilterShow] = useState<boolean>(false);

  const dispatch = useDispatch();

  const fetchApi = async (e: any) => {
    e.preventDefault();
    dispatch(SELECTED_PAGE_ACTION(1));
    callApi(1);
  };

  const callApi = async (p: number) => {
    const name = value.trim().toLowerCase().replaceAll(" ", "-");
    if (name) {
      setLoading(true);

      try {
        const URL = `${process.env.REACT_APP_API_URL}/search?page=${p}`;
        const { data } = await axios.post(URL, {
          name: name,
        });
        setData(data.data);
        setRealData(data.data);
        setPage(data.pagination);
        dispatch(SELECTED_PAGE_ACTION(p));
        setLanguage("all");
        !show && setShow(true);
        error && setError(false);
      } catch (err) {
        setError(true);
        console.log("error = ", err);
      }
      setLoading(false);
    }
  };

  const filter = (e: any) => {
    const lang = e.target.value;
    setLanguage(lang);

    if (lang === "all") {
      setData([...realData]);
      return;
    }

    const filterData: any = realData.filter(
      (data: any) => data.language.toLowerCase() === e.target.value
    );

    setData(filterData);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "1rem 2rem" }}>
        <Back />
      </div>

      <div className="search_container">
        <div className="box">
          <div className="tagline">
            <h1>Advance search (BETA)</h1>
          </div>

          <form onSubmit={fetchApi} className="form">
            <div className="form_input">
              <input
                type="text"
                onChange={(text) => setValue(text.target.value)}
                placeholder="Enter Artist Name"
                value={value}
                className="input"
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
              {filterShow && (
                <div className="filter">
                  <h2>Language :</h2>
                  <div className="language">
                    <input
                      type="checkbox"
                      id="all"
                      name="all"
                      value="all"
                      checked={language === "all"}
                      onChange={filter}
                    />
                    <label htmlFor="all">All</label>

                    <input
                      type="checkbox"
                      id="english"
                      name="english"
                      checked={language === "english"}
                      value="english"
                      onChange={filter}
                    />
                    <label htmlFor="english">English (EN)</label>

                    <input
                      type="checkbox"
                      id="japanese"
                      name="japanese"
                      checked={language === "japanese"}
                      value="japanese"
                      onChange={filter}
                    />
                    <label htmlFor="japanese">Japanese (JA)</label>

                    <input
                      type="checkbox"
                      id="chinese"
                      name="chinese"
                      checked={language === "chinese"}
                      value="chinese"
                      onChange={filter}
                    />
                    <label htmlFor="chinese">Chinese (CH)</label>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        {loading && <Loading />}
        {error && <h2>Not Found!</h2>}
        {show && <Card data={DATA} page={page} callApi={callApi} />}
      </div>

      <Footer />
    </>
  );
};

export default Search;
