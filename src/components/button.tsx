import { motion } from "framer-motion";
import { ReactNode, ComponentProps, forwardRef } from "react";

interface Props extends ComponentProps<"button"> {
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={rest.onClick}
        ref={ref}
        className={rest.className}
        type={rest.type}
      >
        {children}
      </motion.button>
    );
  }
);

export default Button;
