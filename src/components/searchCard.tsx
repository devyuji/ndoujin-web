import { FC } from "react";
import { useSelector } from "react-redux";
import "../styles/component/searchCard.css";

interface CardProps {
  data: any;
  page: number;
  callApi: (p: number) => void;
}

const Card: FC<CardProps> = ({ data, page, callApi }) => {
  const selectedPage = useSelector((s: any) => s.SELECTED_PAGE);
  return (
    <>
      <div className="search_card_container">
        {data.map((d: any, index: Number) => {
          const lang = d.language.slice(0, 2);
          return (
            <a
              href={`https://nhentai.net${d.link}/1`}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              key={`${index}`}
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
            </a>
          );
        })}
      </div>
      <div className="pagination">
        {new Array(page).fill(null).map((p: any, index: number) => (
          <button
            type="button"
            key={`${index}`}
            onClick={() => callApi(index + 1)}
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
