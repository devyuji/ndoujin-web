import { motion } from "framer-motion";
import { FC } from "react";
import "../styles/component/loading.css";

const Loading: FC = () => {
  return (
    <div className="loading_container">
      <motion.svg
        animate={{ x: 30 }}
        transition={{
          repeat: Infinity,
          duration: 0.75,
          ease: "linear",
          repeatType: "reverse",
        }}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </motion.svg>

      <motion.svg
        animate={{ x: -20 }}
        transition={{
          repeat: Infinity,
          duration: 0.75,
          ease: "linear",
          repeatType: "reverse",
        }}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
      </motion.svg>
    </div>
  );
};

export default Loading;
