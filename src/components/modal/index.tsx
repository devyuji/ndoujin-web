import { FC, ReactNode } from "react";
import Backdrop from "./backdrop";
import { motion } from "framer-motion";
import { scaleUp } from "../../lib/animation";
import "../../styles/component/model/index.css";

interface Props {
  handleClose: () => void;
  children: ReactNode;
}

const Model: FC<Props> = ({ children, handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={scaleUp}
        initial="initial"
        animate="start"
        exit="initial"
        onClick={(e) => e.stopPropagation()}
        className="model_container"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Model;
