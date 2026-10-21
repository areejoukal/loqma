// src/components/menu/QuickViewModal.jsx
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Dialog, DialogContent, DialogActions, Divider, Typography, Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppSettings } from '../../context/AppSettingsContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';
import { getPriceWithOption } from '../../data/products';

export default function QuickViewModal({ product, open, onClose }) {
  const { t, lang } = useAppSettings();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!product) return null;

  const defaultOpt = product.options?.[0]?.id;
  const price = getPriceWithOption(product, defaultOpt);

  const handleAdd = () => {
    addItem(product.id, 1);
    showToast(t('addedToCart'));
    onClose();
  };

  const handleDetails = () => {
    onClose();
    navigate(`/menu/${product.slug}`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, scale: 0.92, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 10 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ height: '100%' }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.alt[lang]}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 240 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Box sx={{ p: 3 }}>
              {product.isPopular && (
                <Chip label={t('popular')} color="primary" size="small" sx={{ mb: 1 }} />
              )}
              <Typography variant="h4" sx={{ mb: 1 }}>{product.name[lang]}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description[lang]}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography sx={{ fontSize: '24px', fontWeight: 700, color: 'primary.main' }}>
                {formatPrice(price, lang)}
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={handleDetails} variant="outlined" fullWidth>
            {t('viewDetails')}
          </Button>
        </motion.div>
        <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            disabled={!product.available}
            fullWidth
          >
            {t('addToCart')}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
}