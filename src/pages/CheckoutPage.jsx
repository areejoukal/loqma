// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useAppSettings } from '../context/AppSettingsContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';

const DELIVERY_FEE = 15;
const FREE_DELIVERY_THRESHOLD = 100;
const PROMO_CODE = 'LOQMA10';
const PROMO_PERCENT = 10;

export default function CheckoutPage() {
  const { t, lang } = useAppSettings();
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  if (items.length === 0) {
    return (
      <Container maxWidth="lg">
        <SEO title={t('checkoutTitle')} description="مراجعة الطلب في لُقمة." path="/checkout" />
        <EmptyState
          title={t('cartEmpty')}
          text={t('cartEmptyCheckout')}
          actionLabel={t('exploreMenu')}
          onAction={() => navigate('/menu')}
        />
      </Container>
    );
  }

  const delivery = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = appliedPromo ? Math.round((totalPrice * PROMO_PERCENT) / 100) : 0;
  const grandTotal = totalPrice + delivery - discount;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t('fullNameRequired');
    if (!phone.trim()) e.phone = t('phoneRequired');
    else if (!/^[\d+\-\s()]{6,}$/.test(phone)) e.phone = t('phoneInvalid');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === PROMO_CODE) {
      setAppliedPromo(PROMO_CODE);
      showToast(t('promoApplied'));
      setPromoInput('');
    } else {
      showToast(t('promoInvalid'), 'error');
    }
  };

  const handleRemovePromo = () => setAppliedPromo(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const ref = `LQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = {
      ref, name, phone, items,
      subtotal: totalPrice, delivery, discount, total: grandTotal,
      quantity: totalQuantity, promo: appliedPromo,
    };
    sessionStorage.setItem('loqma:lastOrder', JSON.stringify(order));
    navigate('/order-confirmation', { state: { order } });
    clearCart();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SEO title={t('checkoutTitle')} description="مراجعة الطلب في لُقمة." path="/checkout" />

      <Reveal>
        <Typography variant="h1" component="h1" sx={{ mb: 4 }}>{t('checkoutTitle')}</Typography>
      </Reveal>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Reveal>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ mb: 3 }}>{t('customerInfo')}</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    label={t('fullName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                  />
                  <TextField
                    label={t('phoneNumber')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    fullWidth
                    slotProps={{ htmlInput: { inputMode: 'tel' } }}
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button type="submit" variant="contained" size="large" fullWidth>
                      {t('confirmOrder')}
                    </Button>
                    <Button component={RouterLink} to="/cart" variant="outlined" size="large" fullWidth>
                      {t('backToCartBtn')}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ mb: 3 }}>{t('orderSummaryCheckout')}</Typography>

              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {items.map(({ key, product, option, quantity, lineTotal }) => (
                  <Stack key={key} direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {product.name[lang]}
                      {option ? ` (${option.name[lang]})` : ''} × {quantity}
                    </Typography>
                    <Typography variant="body2">{formatPrice(lineTotal, lang)}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                {!appliedPromo ? (
                  <Stack direction="row" spacing={1}>
                    <TextField
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder={t('promoPlaceholder')}
                      size="small"
                      fullWidth
                      slotProps={{ htmlInput: { 'aria-label': t('promoPlaceholder') } }}
                    />
                    <Button variant="outlined" onClick={handleApplyPromo} disabled={!promoInput.trim()} sx={{ flexShrink: 0 }}>
                      {t('promoApply')}
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', bgcolor: 'custom.brandSoft', p: 1.5, borderRadius: 2 }}>
                    <LocalOfferIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
                      {t('promoAppliedLabel', appliedPromo, PROMO_PERCENT)}
                    </Typography>
                    <IconButton size="small" onClick={handleRemovePromo} aria-label={t('promoRemove')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={1.5}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">{t('subtotal')}</Typography>
                  <Typography variant="body2">{formatPrice(totalPrice, lang)}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">{t('deliveryFee')}</Typography>
                  <Typography variant="body2" color={delivery === 0 ? 'success.main' : 'inherit'}>
                    {delivery === 0 ? t('deliveryFree') : formatPrice(delivery, lang)}
                  </Typography>
                </Stack>
                {discount > 0 && (
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="success.main">{t('discount')}</Typography>
                    <Typography variant="body2" color="success.main">−{formatPrice(discount, lang)}</Typography>
                  </Stack>
                )}
                <Divider />
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="h5">{t('total')}</Typography>
                  <Typography variant="h5" color="primary.main">{formatPrice(grandTotal, lang)}</Typography>
                </Stack>
                {totalPrice < FREE_DELIVERY_THRESHOLD && (
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {t('freeDeliveryHint', formatPrice(FREE_DELIVERY_THRESHOLD - totalPrice, lang))}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Reveal>
      </Box>
    </Container>
  );
}