import { useEffect, useState } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import "../styles/component/navbar.css";
import { dropDown } from "../lib/animation";
import AnimatedPresenseFix from "./animatedPresenseFix";
import { Link } from "react-router-dom";

interface navItemsProps {
  name: string;
  link: string;
  newTab: boolean;
}

const Navbar: FC = () => {
  const [open, toggleOpen] = useState(false);

  const navItems: navItemsProps[] = [
    {
      name: "home",
      link: "/",
      newTab: false,
    },
    {
      name: "saved",
      link: "/saved",
      newTab: false,
    },
    {
      name: "history",
      link: "/history",
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
              <Link to={item.link} onClick={() => toggleOpen(false)}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </>
    );
  };

  return (
    <header className="navbar_container">
      <Link to="/">
        <h1>nd</h1>
      </Link>

      <button
        className="hamburger"
        onClick={() => toggleOpen((prevState) => !prevState)}
      >
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

      <AnimatedPresenseFix>
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
      </AnimatedPresenseFix>
    </header>
  );
};

export default Navbar;
