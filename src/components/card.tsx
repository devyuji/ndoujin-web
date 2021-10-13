import { FC } from "react";
import "../styles/component/card.css";

interface CardProps {
  data: any;
}

const Card: FC<CardProps> = ({ data }) => {
  const addToList = () => {
    let list: any = localStorage.getItem("history");
    list = JSON.parse(list);

    list.push(data.id);
    if (list.length > 500) list.shift();

    localStorage.setItem("history", JSON.stringify(list));

    window.open(`https://nhentai.net/g/${data.id}/1`, "_blank");
  };

  return (
    <div className="card_container">
      <div className="image_container">
        <img src={`data:image/png;base64,${data.image_cover}`} alt="" />
      </div>

      <div className="details">
        <h3>{data.title}</h3>
        <p>No. of pages : {data.page}</p>
        <p>Language : {data.language}</p>
        <p>Artist : {data.artist}</p>
        {/* tags */}
        {data.tags && (
          <div className="tags">
            {data.tags.map((d: string | number, index: number) => (
              <p
                key={index}
                style={{
                  color: d === "netorare" || d === "cheating" ? "red" : "white",
                }}
              >
                {d}
              </p>
            ))}
          </div>
        )}
        <button className="link" onClick={addToList}>
          READ NOW
        </button>
      </div>
    </div>
  );
};

export default Card;
