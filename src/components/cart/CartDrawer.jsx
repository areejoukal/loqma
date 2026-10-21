// src/components/cart/CartDrawer.jsx
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Divider, Drawer, IconButton, Stack, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { useAppSettings } from '../../context/AppSettingsContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import QuantityControl from '../common/QuantityControl';

export default function CartDrawer({ open, onClose }) {
  const { t, lang } = useAppSettings();
  const { items, totalPrice, totalQuantity, increment, decrement, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Drawer
      anchor={lang === 'ar' ? 'left' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 400 }, maxWidth: '100vw', display: 'flex', flexDirection: 'column' } }}
    >
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid', borderColor: 'custom.border' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ShoppingBagOutlinedIcon />
          <Typography variant="h4" component="h2">{t('cartTitle')}</Typography>
          {totalQuantity > 0 && (
            <Typography variant="body2" color="text.secondary">({t('itemsCount', totalQuantity)})</Typography>
          )}
        </Stack>
        <IconButton onClick={onClose} aria-label={t('close')}>
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1 }}>{t('cartEmpty')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{t('cartEmptyText')}</Typography>
            <Button variant="contained" onClick={() => { onClose(); navigate('/menu'); }}>
              {t('exploreMenu')}
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {items.map(({ key, product, option, quantity, unitPrice, lineTotal }) => (
              <Box key={key} sx={{ display: 'flex', gap: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.alt[lang]}
                  sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                    {product.name[lang]}
                  </Typography>
                  {option && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {option.name[lang]}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {formatPrice(unitPrice, lang)}
                  </Typography>
                  <Stack direction="row" sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <QuantityControl
                      value={quantity}
                      onIncrement={() => increment(product.id, option?.id)}
                      onDecrement={() => decrement(product.id, option?.id)}
                      size="small"
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {formatPrice(lineTotal, lang)}
                    </Typography>
                    <IconButton
                      onClick={() => removeItem(product.id, option?.id)}
                      aria-label={t('removeItem')}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            ))}
            <Button variant="text" color="error" size="small" onClick={clearCart} sx={{ alignSelf: 'flex-start' }}>
              {t('clearCart')}
            </Button>
          </Stack>
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'custom.border', bgcolor: 'custom.surfaceSecondary' }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">{t('total')}</Typography>
            <Typography variant="h5" color="primary.main">{formatPrice(totalPrice, lang)}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Button variant="contained" size="large" fullWidth onClick={handleCheckout}>
              {t('proceedToCheckout')}
            </Button>
            <Button variant="outlined" fullWidth onClick={handleViewCart}>
              {t('navCart')}
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}