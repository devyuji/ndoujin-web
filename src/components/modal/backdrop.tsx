import { FC, ReactNode, useEffect } from "react";
import "../../styles/component/model/backdrop.css";
import { motion } from "framer-motion";

// lib
import { fadeIn } from "../../lib/animation";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

const Backdrop: FC<Props> = ({ children, onClick }) => {
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
