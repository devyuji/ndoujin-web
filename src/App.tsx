import type { FC } from "react";
import { useEffect } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Saved from "./pages/saved";
import History from "./pages/history";
import NotFound from "./pages/notfound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {
  useEffect(() => {
    const saved = localStorage.getItem("saved");
    const history = localStorage.getItem("history");

    if (saved == null) {
      localStorage.setItem("saved", JSON.stringify([]));
    }

    if (history === null) {
      localStorage.setItem("history", JSON.stringify([]));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
