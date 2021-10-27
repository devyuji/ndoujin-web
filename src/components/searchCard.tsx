import { FC } from "react";
import { useHistory } from "react-router";

// redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SET_INPUT } from "../redux/reducers/inputReducer";

// components
import "../styles/component/searchCard.css";

interface CardProps {
  page: number;
  artistName: String;
  callApi: (p: number) => void;
}

const Card: FC<CardProps> = ({ page, callApi, artistName }) => {
  const selectedPage = useAppSelector((state) => state.SELECTED_PAGE);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { data } = useAppSelector((state) => state.FILTER_DATA);

  if (data.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2 style={{ textAlign: "center" }}>No result found!</h2>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          padding: "1rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 className="artist_name">Search Result : {artistName}</h1>
      </div>

      <div className="search_card_container">
        {data.map((d: any, index: Number) => {
          const lang = d.language.slice(0, 2);
          return (
            <button
              className="card"
              key={`${index}`}
              onClick={() => {
                dispatch(SET_INPUT(d.link));
                history.push("/");
              }}
            >
              <div className="image_container">
                <img src={`data:image/png;base64,${d.image}`} alt="" />
              </div>
              <div className="title">
                <h2>{d.title}</h2>
              </div>
              <div className="lang">
                <p>{lang}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pagination">
        {new Array(page).fill(null).map((p: any, index: number) => (
          <button
            type="button"
            key={`${index}`}
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              callApi(index + 1);
            }}
            className={selectedPage === index + 1 ? "selected" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Card;
