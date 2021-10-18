import { FC } from "react";
import "../styles/component/footer.css";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>Made by Yuji</p>
      <a
        href="https://github.com/devyuji/ndoujin-app/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        Report a bug.
      </a>
    </footer>
  );
};

export default Footer;
