import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// styles
import "../styles/component/navbar.css";

// lib
import { dropDown } from "../lib/animation";

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open]);

  const NavLinks: FC = () => {
    return (
      <>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/history">history</Link>
        </li>

        <li>
          <Link to="/search">search</Link>
        </li>

        <li>
          <a
            href="https://github.com/devyuji/ndoujin-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </li>

        <li>
          <a
            href="https://instagram.com/devyuji"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>
        </li>
      </>
    );
  };

  return (
    <header className="navbar_container">
      <h1>nd</h1>

      <button className="hamburger" onClick={() => setOpen(!open)}>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.line
            animate={{ rotate: open ? -45 : 0 }}
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          ></motion.line>
          <motion.line
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.1 }}
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          ></motion.line>
          <motion.line
            animate={{ rotate: open ? 45 : 0 }}
            x1="3"
            y1="18"
            x2="21"
            y2="18"
          ></motion.line>
        </svg>
      </button>

      <ul className="list">
        <NavLinks />
      </ul>
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mobile_list"
          >
            <NavLinks />
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
