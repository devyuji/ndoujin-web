import type { FC } from "react";
import { saveHistory } from "../lib/history";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSaved, toggleError } from "../redux/reducers/homeState";
import "../styles/component/card.css";
import Button from "./button";

interface Props {}

const Card: FC<Props> = () => {
  const data = useAppSelector((state) => state.doujinData);
  const isSaved = useAppSelector((state) => state.homeState.isSaved);

  const dispatch = useAppDispatch();

  const readNow = () => {
    saveHistory(data.id);

    window.open(`https://nhentai.net/g/${data?.id}/1`, "_blank");
  };

  const saved = () => {
    console.log("saved function called");

    try {
      let savedData: any = localStorage.getItem("saved");

      savedData = JSON.parse(savedData);

      if (isSaved) {
        const found = savedData.findIndex(
          (element: any) => element.id === data.id
        );

        savedData.splice(found, 1);

        localStorage.setItem("saved", JSON.stringify(savedData));

        dispatch(setSaved(false));

        return;
      }

      const saveData = {
        id: data.id,
        name: data.title,
        image: data.image_cover,
      };

      savedData.push(saveData);

      localStorage.setItem("saved", JSON.stringify(savedData));

      dispatch(setSaved(true));
    } catch (err) {
      dispatch(toggleError());
    }
  };

  return (
    <div className="card_container">
      <div className="top">
        <Button type="button" onClick={() => console.log("copy to clipboard")}>
          #{data!.id}
        </Button>

        <Button type="button" onClick={saved}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill={isSaved ? "white" : "none"}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </Button>
      </div>

      <div className="details">
        <div>
          <img
            src={`data:image/png;base64,${data.image_cover}`}
            alt={data.title}
          />
        </div>

        <div>
          <h1>{data?.title}</h1>
          <p>No. of pages : {data.page}</p>
          <p>Language : {data.language}</p>
          <p>Artist : {data.artist}</p>

          <div className="tags-container">
            {data.tags.map((tag, index) => (
              <p
                key={index}
                style={{
                  color:
                    tag === "cheating" || tag === "netorare" || tag === "rape"
                      ? "red"
                      : "white",
                }}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Button className="read-now" onClick={readNow} type="button">
        Read Now
      </Button>
    </div>
  );
};

export default Card;
