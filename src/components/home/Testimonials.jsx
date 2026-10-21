// src/components/home/Testimonials.jsx
import { Box, Card, CardContent, Container, Rating, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useAppSettings } from '../../context/AppSettingsContext';
import Reveal from '../common/Reveal';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials() {
  const { t, lang } = useAppSettings();

  const reviews = [
    { nameAr: 'سارة', nameEn: 'Sarah', stars: 5, textAr: 'تجربة ممتازة، الطعام وصل دافئًا والطلب كان سهلاً.', textEn: 'Excellent experience, food arrived warm and ordering was easy.' },
    { nameAr: 'محمد', nameEn: 'Mohammed', stars: 5, textAr: 'القائمة منظمة والبحث سريع. أعجبني المنسف.', textEn: 'Menu is organized and search is fast. Loved the mansaf.' },
    { nameAr: 'ليلى', nameEn: 'Layla', stars: 4, textAr: 'الكنافة رائعة، أنصح بتجربتها.', textEn: 'The kunafa is amazing, highly recommend it.' },
  ];

  return (
    <Box sx={{ bgcolor: 'custom.surfaceSecondary', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" component="h2" sx={{ mb: 1 }}>{t('testimonialsTitle')}</Typography>
          </Box>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((r, i) => (
            <motion.div key={i} variants={item}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.3, mb: 1 }} />
                    <Typography variant="body1" sx={{ mb: 3, minHeight: 80 }}>
                      {lang === 'ar' ? r.textAr : r.textEn}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {lang === 'ar' ? r.nameAr : r.nameEn}
                      </Typography>
                      <Rating value={r.stars} readOnly size="small" />
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
}