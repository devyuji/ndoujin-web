import { FC, useRef } from "react";
import "../styles/component/footer.css";

const Footer: FC = () => {
  const year = useRef(new Date().getFullYear());

  return (
    <footer className="footer">
      <p>Created by Yuji - {year.current}</p>
    </footer>
  );
};

export default Footer;
