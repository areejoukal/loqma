// src/components/common/StaggerGrid.jsx
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StaggerGrid({ children, sx }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
      style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        ...sx,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return <motion.div variants={item}>{children}</motion.div>;
}