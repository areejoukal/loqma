// src/pages/CartPage.jsx
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSettings } from '../context/AppSettingsContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import QuantityControl from '../components/common/QuantityControl';
import EmptyState from '../components/common/EmptyState';
import Reveal from '../components/common/Reveal';

export default function CartPage() {
  const { t, lang } = useAppSettings();
  const { items, totalPrice, totalQuantity, increment, decrement, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg">
        <EmptyState
          title={t('cartEmpty')}
          text={t('cartEmptyText')}
          actionLabel={t('exploreMenu')}
          onAction={() => navigate('/menu')}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Reveal>
        <Typography variant="h1" component="h1" sx={{ mb: 4 }}>{t('cartTitle')}</Typography>
      </Reveal>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
        <Stack spacing={2}>
          {items.map(({ key, product, option, quantity, unitPrice, lineTotal }, i) => (
            <Reveal key={key} delay={0.05 * i}>
              <motion.div layout whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.alt[lang]}
                        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" component="h3">{product.name[lang]}</Typography>
                        {option && (
                          <Typography variant="caption" color="text.secondary">{option.name[lang]}</Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">{formatPrice(unitPrice, lang)}</Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: 'primary.main' }}>
                          {formatPrice(lineTotal, lang)}
                        </Typography>
                      </Box>
                      <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
                        <QuantityControl
                          value={quantity}
                          onIncrement={() => increment(product.id, option?.id)}
                          onDecrement={() => decrement(product.id, option?.id)}
                          size="small"
                        />
                        <IconButton
                          onClick={() => removeItem(product.id, option?.id)}
                          aria-label={t('removeItem')}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </Stack>

        <Reveal delay={0.2}>
          <Card sx={{ height: 'fit-content', position: { md: 'sticky' }, top: { md: 100 } }}>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ mb: 3 }}>{t('orderSummary')}</Typography>
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Typography color="text.secondary">{t('itemsCount', totalQuantity)}</Typography>
                <Divider />
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="h5">{t('total')}</Typography>
                  <Typography variant="h5" color="primary.main">{formatPrice(totalPrice, lang)}</Typography>
                </Stack>
              </Stack>
              <Stack spacing={1.5}>
                <Button variant="contained" size="large" fullWidth onClick={() => navigate('/checkout')}>
                  {t('proceedToCheckout')}
                </Button>
                <Button component={RouterLink} to="/menu" variant="outlined" fullWidth>
                  {t('continueShopping')}
                </Button>
                <Button variant="text" color="error" onClick={clearCart}>
                  {t('clearCart')}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Reveal>
      </Box>
    </Container>
  );
}