// src/components/menu/ProductCard.jsx
import { useState } from 'react';
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppSettings } from '../../context/AppSettingsContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCartDrawer } from '../../context/CartDrawerContext';
import { formatPrice } from '../../utils/formatPrice';
import QuickViewModal from './QuickViewModal';

function highlight(text, query) {
  if (!query) return text;
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <Box
        key={i}
        component="mark"
        sx={{ bgcolor: 'secondary.main', color: '#FFF', borderRadius: 0.5, px: 0.25 }}
      >
        {part}
      </Box>
    ) : (
      part
    )
  );
}

export default function ProductCard({ product, searchQuery = '' }) {
  const { lang, t } = useAppSettings();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggle: toggleWish } = useWishlist();
  const { openDrawer } = useCartDrawer();
  const [quickOpen, setQuickOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  const name = product.name[lang];
  const desc = product.description[lang];
  const alt = product.alt[lang];
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product.id, 1);
    showToast(t('addedToCart'));
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    setTimeout(() => openDrawer(), 250);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ height: '100%' }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.4s ease',
            '&:hover': { boxShadow: 8 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* صورة */}
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              component={RouterLink}
              to={`/menu/${product.slug}`}
              sx={{
                display: 'block',
                aspectRatio: '4 / 3',
                bgcolor: 'custom.surfaceSecondary',
                overflow: 'hidden',
              }}
            >
              <Box
                component={motion.img}
                src={product.image}
                alt={alt}
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            {!product.available && (
              <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                <Chip label={t('outOfStock')} color="error" size="small" />
              </Box>
            )}

            {/* زر المفضلة */}
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={() => toggleWish(product.id)}
                  aria-label={wished ? t('removeFromWishlist') : t('addToWishlist')}
                  size="small"
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' },
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={wished ? 'filled' : 'outline'}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {wished ? (
                        <FavoriteIcon color="error" fontSize="small" />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </IconButton>
              </motion.div>
            </Box>

            {/* زر Quick View */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '.MuiCard-root:hover &': { opacity: 1 },
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={() => setQuickOpen(true)}
                  aria-label={t('quickView')}
                  size="small"
                  sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.paper' } }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Box>
          </Box>

          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {product.isPopular && (
              <Chip label={t('popular')} color="primary" size="small" sx={{ mb: 1, alignSelf: 'flex-start' }} />
            )}
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              {highlight(name, searchQuery)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
              {desc}
            </Typography>

            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 700, color: 'primary.main' }}>
                {formatPrice(product.price, lang)}
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                  disabled={!product.available}
                  onClick={handleAdd}
                  sx={pulse ? {
                    animation: 'pulse 0.6s ease',
                    '@keyframes pulse': {
                      '0%,100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                    },
                  } : {}}
                >
                  {t('addToCart')}
                </Button>
              </motion.div>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      <QuickViewModal product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}