import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/component/navbar.css";

const Navbar: FC = () => {
  return (
    <header className="navbar_container">
      <h1>nd</h1>
      <ul>
        <li>
          <Link to="/history">history</Link>
        </li>

        <li>
          <a href="https://instagram.com/devyuji">instagram</a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
