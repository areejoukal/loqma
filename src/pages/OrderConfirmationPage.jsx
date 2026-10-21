// src/pages/OrderConfirmationPage.jsx
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppSettings } from '../context/AppSettingsContext';
import { formatPrice } from '../utils/formatPrice';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';

export default function OrderConfirmationPage() {
  const { t, lang } = useAppSettings();
  const location = useLocation();

  const order = location.state?.order
    || JSON.parse(sessionStorage.getItem('loqma:lastOrder') || 'null');

  if (!order) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <SEO title={t('notFoundTitle')} description="لا يوجد طلب." path="/order-confirmation" />
        <Typography variant="h3" sx={{ mb: 2 }}>{t('notFoundTitle')}</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>{t('notFoundText')}</Typography>
        <Button component={RouterLink} to="/menu" variant="contained">{t('returnToMenu')}</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <SEO
        title={t('confirmationTitle')}
        description="تم تأكيد طلبك في لُقمة."
        path="/order-confirmation"
      />

      <Reveal>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            </motion.div>

            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>{t('confirmationTitle')}</Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">{t('confirmationRef')}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{order.ref}</Typography>
              </Box>
              <Divider />
              {order.subtotal !== undefined && (
                <Stack spacing={1} sx={{ textAlign: 'start' }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">{t('subtotal')}</Typography>
                    <Typography variant="body2">{formatPrice(order.subtotal, lang)}</Typography>
                  </Stack>
                  {order.delivery !== undefined && (
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">{t('deliveryFee')}</Typography>
                      <Typography variant="body2">
                        {order.delivery === 0 ? t('deliveryFree') : formatPrice(order.delivery, lang)}
                      </Typography>
                    </Stack>
                  )}
                  {order.discount > 0 && (
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="success.main">{t('discount')}</Typography>
                      <Typography variant="body2" color="success.main">−{formatPrice(order.discount, lang)}</Typography>
                    </Stack>
                  )}
                </Stack>
              )}
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary">{t('confirmationTotal')}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {formatPrice(order.total, lang)}
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Button component={RouterLink} to="/menu" variant="contained" size="large">
                {t('returnToMenu')}
              </Button>
              <Button component={RouterLink} to="/" variant="outlined">
                {t('returnHome')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Reveal>
    </Container>
  );
}