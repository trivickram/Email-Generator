import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
    filter: 'blur(10px)',
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    scale: 1.02,
    y: -20,
    filter: 'blur(10px)',
  }
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94], // Apple's easing curve
  duration: 0.6
};

const containerVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren"
    }
  }
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
