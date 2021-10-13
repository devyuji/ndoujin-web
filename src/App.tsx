import { FC, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import History from "./pages/history";

const App: FC = () => {
  useEffect(() => {
    const list = localStorage.getItem("history");

    if (!list) localStorage.setItem("history", JSON.stringify([]));
  }, []);

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
