import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  start: {
    opacity: 1,
    scale: 1,
  },
};

export const dropDown: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
