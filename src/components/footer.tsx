import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import "../styles/component/footer.css";

const Footer: FC = () => {
  const status = useAppSelector((state) => state.APP_STATUS);
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    if (status === "Good") setColor("#3BF24A");
    else if (status === "Bad") setColor("red");
  }, [status]);

  return (
    <footer className="footer">
      <p>Made by Yuji</p>
      <p>
        App Status : <span style={{ color }}>{status}</span>
      </p>
    </footer>
  );
};

export default Footer;
