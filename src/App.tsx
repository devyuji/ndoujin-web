import { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

// pages
import Home from "./pages/home";
import Search from "./pages/search";
import History from "./pages/history";

// redux
import { useAppDispatch } from "./redux/hooks";
import { BAD, GOOD } from "./redux/reducers/appStatusReducer";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const list = localStorage.getItem("history");

    if (!list) localStorage.setItem("history", JSON.stringify([]));

    checkStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStatus = async () => {
    try {
      const { status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/status`
      );
      if (status === 200) dispatch(GOOD());
    } catch (err) {
      dispatch(BAD());
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<RedirectHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const RedirectHome: FC = () => {
  return <Navigate to="/" />;
};

export default App;
