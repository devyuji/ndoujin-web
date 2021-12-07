import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useCycle } from "framer-motion";

// styles
import "../styles/component/navbar.css";

// lib
import { dropDown } from "../lib/animation";

interface navItemsProps {
  name: string;
  link: string;
  newTab: boolean;
}

const Navbar: FC = () => {
  const [open, toggleOpen] = useCycle(false, true);

  const navItems: Array<navItemsProps> = [
    {
      name: "home",
      link: "/",
      newTab: false,
    },
    {
      name: "history",
      link: "/history",
      newTab: false,
    },
    {
      name: "search",
      link: "/search",
      newTab: false,
    },
    {
      name: "github",
      link: "https://github.com/devyuji/ndoujin-app",
      newTab: true,
    },
    {
      name: "instagram",
      link: "https://instagram.com/devyuji",
      newTab: true,
    },
  ];

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
        {navItems.map((item, index) => (
          <li key={`${index}`}>
            {item.newTab ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              <Link to={item.link}>{item.name}</Link>
            )}
          </li>
        ))}
      </>
    );
  };

  return (
    <header className="navbar_container">
      <h1>nd</h1>

      <button className="hamburger" onClick={() => toggleOpen()}>
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.line
            animate={{ opacity: open ? 0 : 1, translateX: open ? "100%" : 0 }}
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          ></motion.line>
          <motion.line
            animate={{
              rotate: open ? -45 : 0,
              translateY: open ? 6 : 0,
            }}
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          ></motion.line>
          <motion.line
            animate={{
              rotate: open ? 45 : 0,
              translateY: open ? -6 : 0,
            }}
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

      <AnimatePresence exitBeforeEnter={true}>
        {open && (
          <motion.ul
            variants={dropDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
