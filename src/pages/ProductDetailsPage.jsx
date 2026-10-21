// src/pages/ProductDetailsPage.jsx
import { useMemo, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Container, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useAppSettings } from '../context/AppSettingsContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { useCartDrawer } from '../context/CartDrawerContext';
import { getProductBySlug, products, getPriceWithOption, getDefaultOption } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import QuantityControl from '../components/common/QuantityControl';
import EmptyState from '../components/common/EmptyState';
import ProductGrid from '../components/menu/ProductGrid';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';
import { productSchema } from '../utils/structuredData';

const COMPLEMENTARY = {
  appetizers: ['main-dishes', 'drinks'],
  'main-dishes': ['appetizers', 'desserts'],
  desserts: ['drinks'],
  drinks: ['desserts'],
};

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { t, lang } = useAppSettings();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggle: toggleWish } = useWishlist();
  const { openDrawer } = useCartDrawer();
  const navigate = useNavigate();

  const product = getProductBySlug(slug);
  const defaultOpt = product ? getDefaultOption(product) : null;
  const [selectedOption, setSelectedOption] = useState(defaultOpt?.id ?? null);
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.available)
      .slice(0, 4);
  }, [product]);

  const crossSell = useMemo(() => {
    if (!product) return [];
    const complementaryCats = COMPLEMENTARY[product.categoryId] || [];
    return products
      .filter((p) => complementaryCats.includes(p.categoryId) && p.available)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <Container maxWidth="lg">
        <SEO title={t('productNotFound')} description="الصنف غير موجود." path={`/menu/${slug}`} />
        <EmptyState
          title={t('productNotFound')}
          text={t('productNotFoundText')}
          actionLabel={t('backToMenu')}
          onAction={() => navigate('/menu')}
        />
      </Container>
    );
  }

  const currentPrice = getPriceWithOption(product, selectedOption);
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product.id, qty, selectedOption);
    showToast(t('addedToCart'));
    setQty(1);
    setTimeout(() => openDrawer(), 250);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: { xs: 12, md: 4 } }}>
      <SEO
        title={product.name[lang]}
        description={product.description[lang]}
        path={`/menu/${product.slug}`}
        image={`https://loqma-demo.vercel.app${product.image}`}
        type="product"
        jsonLd={productSchema(product, lang)}
      />

      <Button component={RouterLink} to="/menu" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        {t('backToMenu')}
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.alt[lang]}
            sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 3 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              {product.isPopular && <Chip label={t('popular')} color="primary" size="small" />}
              <Chip
                label={product.available ? t('available') : t('outOfStock')}
                color={product.available ? 'success' : 'error'}
                size="small"
              />
            </Stack>

            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '28px', md: '40px' } }}>
                {product.name[lang]}
              </Typography>
              <Button
                onClick={() => toggleWish(product.id)}
                startIcon={wished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                size="small"
                sx={{ flexShrink: 0 }}
              >
                {wished ? t('removeFromWishlist') : t('addToWishlist')}
              </Button>
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product.description[lang]}
            </Typography>

            <Typography sx={{ fontSize: '32px', fontWeight: 700, color: 'primary.main', mb: 3 }}>
              {formatPrice(currentPrice, lang)}
            </Typography>

            {product.options && product.options.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{t('selectOption')}</Typography>
                <FormControl>
                  <RadioGroup value={selectedOption ?? ''} onChange={(e) => setSelectedOption(e.target.value)}>
                    {product.options.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        value={opt.id}
                        control={<Radio />}
                        label={
                          <Stack direction="row" spacing={1}>
                            <Typography>{opt.name[lang]}</Typography>
                            {opt.priceDelta > 0 && (
                              <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                                +{formatPrice(opt.priceDelta, lang)}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            <Divider sx={{ mb: 3 }} />

            {product.available ? (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
                <Typography variant="body2" color="text.secondary">{t('selectQuantity')}</Typography>
                <QuantityControl
                  value={qty}
                  onIncrement={() => setQty((q) => Math.min(99, q + 1))}
                  onDecrement={() => setQty((q) => Math.max(1, q - 1))}
                />
                <Button variant="contained" size="large" startIcon={<AddShoppingCartIcon />} onClick={handleAdd}>
                  {t('addToCart')}
                </Button>
              </Stack>
            ) : (
              <Chip label={t('outOfStock')} color="error" />
            )}
          </Box>
        </motion.div>
      </Box>

      {crossSell.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Typography variant="h3" component="h2" sx={{ mb: 1 }}>{t('crossSellTitle')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{t('crossSellSubtitle')}</Typography>
          </Reveal>
          <ProductGrid products={crossSell} />
        </Box>
      )}

      {related.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Typography variant="h3" component="h2" sx={{ mb: 3 }}>{t('relatedProducts')}</Typography>
          </Reveal>
          <ProductGrid products={related} />
        </Box>
      )}

      {product.available && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'fixed',
            bottom: 0,
            insetInline: 0,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'custom.border',
            p: 2,
            zIndex: 10,
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: 'primary.main', fontSize: '18px' }}>
            {formatPrice(currentPrice * qty, lang)}
          </Typography>
          <Button variant="contained" fullWidth startIcon={<AddShoppingCartIcon />} onClick={handleAdd}>
            {t('addToCart')}
          </Button>
        </Box>
      )}
    </Container>
  );
}