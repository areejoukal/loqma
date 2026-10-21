// src/pages/NotFoundPage.jsx
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSettings } from '../context/AppSettingsContext';
import SEO from '../components/seo/SEO';

export default function NotFoundPage() {
  const { t } = useAppSettings();

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <SEO title={t('notFoundTitle')} description="الصفحة غير موجودة." path="/404" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '80px', md: '120px' }, color: 'primary.main', fontWeight: 700 }}>
          404
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>{t('notFoundSubtitle')}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>{t('notFoundText')}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
          <Button component={RouterLink} to="/" variant="contained" size="large">{t('goHome')}</Button>
          <Button component={RouterLink} to="/menu" variant="outlined" size="large">{t('exploreMenu')}</Button>
        </Stack>
      </motion.div>
    </Container>
  );
}