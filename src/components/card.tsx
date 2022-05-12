import { FC } from "react";
import { dataType } from "../lib/types";
import "../styles/component/card.css";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/animation";

interface Props {
  data: dataType;
}

const Card: FC<Props> = ({ data }) => {
  const addToList = () => {
    // let list: any = localStorage.getItem("history");
    // list = JSON.parse(list);

    // list.push(data.id);
    // if (list.length > 500) list.shift();

    // localStorage.setItem("history", JSON.stringify(list));

    window.open(`https://nhentai.net/g/${data.id}/1`, "_blank");
  };

  return (
    <>
      <p className="code">#{data.id}</p>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="card_container"
      >
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
              {data.tags.map((d: String, index: number) => (
                <p
                  key={index}
                  style={{
                    color:
                      d === "netorare" || d === "cheating" ? "red" : "white",
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
      </motion.div>
    </>
  );
};

export default Card;
