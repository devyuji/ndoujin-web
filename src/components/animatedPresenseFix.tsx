import { AnimatePresence, AnimatePresenceProps } from "framer-motion";

interface NewAnimatePresenceProps
  extends Omit<AnimatePresenceProps, "children"> {
  children: React.ReactNode;
}

function AnimatedPresenseFix({ children }: { children: React.ReactNode }) {
  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

  return <NewAnimatePresence>{children}</NewAnimatePresence>;
}

export default AnimatedPresenseFix;
