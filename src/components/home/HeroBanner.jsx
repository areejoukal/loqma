// src/components/home/HeroBanner.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSettings } from '../../context/AppSettingsContext';

export default function HeroBanner() {
  const { t, isRtl } = useAppSettings();
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        minHeight: { xs: 480, sm: 540, md: 640 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
          scale: 1.15,
        }}
      >
        {/* Ken Burns — متوسط 12 ثانية */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/products/grilled-chicken.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.06, 1],
                  x: ['0%', '1%', '0%'],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(23,26,21,0.88) 0%, rgba(23,26,21,0.5) 60%, rgba(23,26,21,0.35) 100%)',
          zIndex: 1,
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 10 } }}>
          <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 640 }}>
            <Typography
              component="h1"
              sx={{
                color: '#FAF8F2',
                fontSize: { xs: '28px', sm: '36px', md: '52px' },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              {t('heroTitle')}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(250,248,242,0.9)',
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              {t('heroSubtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: { xs: 1, md: 2 } }}>
              <Button
                component={RouterLink}
                to="/menu"
                variant="contained"
                size="large"
                endIcon={isRtl ? null : <ArrowForwardIcon />}
                startIcon={isRtl ? <ArrowForwardIcon sx={{ transform: 'scaleX(-1)' }} /> : null}
                sx={{
                  backgroundColor: '#B95F43',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#9E4D35' },
                }}
              >
                {t('heroCta')}
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(250,248,242,0.6)',
                  color: '#FAF8F2',
                  '&:hover': {
                    borderColor: '#FAF8F2',
                    backgroundColor: 'rgba(250,248,242,0.08)',
                  },
                }}
              >
                {t('heroSecondary')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </motion.div>
    </Box>
  );
}