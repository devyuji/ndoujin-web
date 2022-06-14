import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSaved } from "../redux/reducers/homeState";
import "../styles/pages/saved.css";

interface Props {}

const Saved: FC<Props> = () => {
  const [data, setData] = useState([]);
  const doujinData = useAppSelector((state) => state.doujinData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    render();
    console.log("saved page render");
  }, []);

  const unSaved = (id: string) => {
    let list: any = localStorage.getItem("saved");
    list = JSON.parse(list);

    const found = list.findIndex((element: any) => element.id === id);

    if (found !== -1) {
      list.splice(found, 1);
      if (doujinData.id === id) {
        dispatch(setSaved(false));
      }
      localStorage.setItem("saved", JSON.stringify(list));
      render();
    }
  };

  const render = () => {
    let saved: any = localStorage.getItem("saved");

    if (saved !== null) {
      saved = JSON.parse(saved);

      setData(saved.reverse());
    }
  };

  return (
    <div className="saved-main">
      <div className="heading">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <h1>Saved</h1>
      </div>
      <div className="saved-card-container">
        {data.map((d: any, index) => (
          <div key={index} className="saved-card">
            <div className="image-container">
              <img src={`data:image/png;base64,${d.image}`} alt="" />
            </div>

            <Link to={`/?code=${d.id}`} className="details">
              <p className="title">
                {d.name.length > 70 ? d.name.substring(0, 70) + "...." : d.name}
              </p>
              <p>#{d.id}</p>
            </Link>

            <Button type="button" onClick={() => unSaved(d.id)}>
              <svg
                viewBox="0 0 24 24"
                fill="red"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
