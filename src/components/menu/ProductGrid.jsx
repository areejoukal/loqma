// src/components/menu/ProductGrid.jsx
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProductGrid({ products, searchQuery = '', gridKey = '' }) {
  return (
    <motion.div
      key={gridKey}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={item}>
          <ProductCard product={p} searchQuery={searchQuery} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </Box>
  );
}