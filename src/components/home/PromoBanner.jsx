// src/components/home/PromoBanner.jsx
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSettings } from '../../context/AppSettingsContext';
import Reveal from '../common/Reveal';

export default function PromoBanner() {
  const { t, isRtl } = useAppSettings();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Reveal>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #35452F 0%, #202D1D 100%)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                insetInlineEnd: -60,
                top: -60,
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'rgba(185,95,67,0.25)',
                animation: 'float 6s ease-in-out infinite',
              },
              '@keyframes float': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(-10px, 10px)' },
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{ color: '#FAF8F2', mb: 1, fontSize: { xs: '28px', md: '36px' } }}
              >
                {t('promoTitle')}
              </Typography>
              <Typography sx={{ color: 'rgba(250,248,242,0.85)', fontSize: '16px', maxWidth: 520 }}>
                {t('promoSubtitle')}
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/menu"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#B95F43',
                color: '#FFF',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                '&:hover': { backgroundColor: '#9E4D35' },
              }}
            >
              {isRtl ? 'تسوق الآن' : 'Shop Now'}
            </Button>
          </Box>
        </motion.div>
      </Reveal>
    </Container>
  );
}