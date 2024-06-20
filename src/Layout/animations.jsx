import { motion } from "framer-motion";

export const OPACITY_ON_LOAD = {
    as: motion.div,
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}

export const SLIDE_IN_BOTTOM = {
    as: motion.div,
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  };
  

  export const FADE_IN_SCALE_UP = {
    as: motion.div,
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeInOut" }
  };
  