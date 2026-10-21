// src/components/home/GalleryStrip.jsx
import { Box, Container, Typography } from '@mui/material';
import { useAppSettings } from '../../context/AppSettingsContext';
import Reveal from '../common/Reveal';

const GALLERY = [
  '/images/products/hummus.jpg',
  '/images/products/grilled-chicken.jpg',
  '/images/products/kunafa.jpg',
  '/images/products/mutabbal.jpg',
  '/images/products/mint-lemonade.jpg',
  '/images/products/kebab.jpg',
  '/images/products/lamb-mansaf.jpg',
  '/images/products/falafel.jpg',
  '/images/products/baklava.jpg',
  '/images/products/arabic-coffee.jpg',
];

export default function GalleryStrip() {
  const { t } = useAppSettings();

  const duplicated = [...GALLERY, ...GALLERY];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="h2" component="h2" sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
            {t('galleryTitle')}
          </Typography>
        </Reveal>
      </Container>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: { xs: 40, md: 120 },
            zIndex: 2,
            pointerEvents: 'none',
          },
          '&::before': {
            insetInlineStart: 0,
            background: 'linear-gradient(to right, rgba(250,248,242,1), rgba(250,248,242,0))',
          },
          '&::after': {
            insetInlineEnd: 0,
            background: 'linear-gradient(to left, rgba(250,248,242,1), rgba(250,248,242,0))',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 3 },
            width: 'max-content',
            animation: 'marquee 45s linear infinite',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {duplicated.map((src, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 180, sm: 220, md: 260 },
                flexShrink: 0,
                aspectRatio: '1 / 1',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.4s ease',
                '&:hover': { transform: 'scale(1.03)' },
                '&:hover img': { transform: 'scale(1.1)' },
              }}
            >
              <Box
                component="img"
                src={src}
                alt={`Gallery ${(i % GALLERY.length) + 1}`}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}