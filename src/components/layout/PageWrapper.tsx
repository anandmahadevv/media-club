import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -15 }
};

const pageTransition: any = {
  type: 'tween' as const,
  ease: 'easeOut',
  duration: 0.3
};

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
