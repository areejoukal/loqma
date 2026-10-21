// src/components/home/CategoriesGrid.jsx
import { Box, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSettings } from '../../context/AppSettingsContext';
import { categories } from '../../data/categories';
import Reveal from '../common/Reveal';

const CATEGORY_IMAGES = {
  appetizers: '/images/products/hummus.jpg',
  'main-dishes': '/images/products/grilled-chicken.jpg',
  desserts: '/images/products/kunafa.jpg',
  drinks: '/images/products/mint-lemonade.jpg',
};

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

export default function CategoriesGrid() {
  const { t } = useAppSettings();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Reveal>
        <Typography variant="h2" component="h2" sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
          {t('categoriesTitle')}
        </Typography>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }}
        className="categories-grid"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={item}>
            <Box
              component={RouterLink}
              to={`/menu?category=${cat.id}`}
              sx={{
                position: 'relative',
                display: 'block',
                aspectRatio: '1 / 1',
                borderRadius: 3,
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 },
                '&:hover img': { transform: 'scale(1.1)' },
                '&:hover .overlay': { backgroundColor: 'rgba(23,26,21,0.5)' },
              }}
            >
              <Box
                component="img"
                src={CATEGORY_IMAGES[cat.id]}
                alt={t(cat.nameKey)}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(23,26,21,0.85), transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2,
                  transition: 'background-color 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    color: '#FAF8F2',
                    fontWeight: 700,
                    fontSize: { xs: '15px', sm: '18px', md: '20px' },
                  }}
                >
                  {t(cat.nameKey)}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .categories-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (min-width: 900px) {
          .categories-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </Container>
  );
}