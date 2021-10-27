import { FC, useEffect } from "react";
import "../../styles/component/model/backdrop.css";
import { motion } from "framer-motion";

// lib
import { fadeIn } from "../../lib/animation";
// import { useEffect } from "react-router/node_modules/@types/react";

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: FC<BackdropProps> = ({ children, onClick }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="backdrop_container"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
