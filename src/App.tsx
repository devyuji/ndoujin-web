import { FC, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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

    setInterval(() => {
      checkStatus();
    }, 60000);

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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/history" exact component={History} />
          <Route path="*" component={RedirectHome} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const RedirectHome: FC = () => {
  return <Redirect to="/" />;
};

export default App;
