// src/pages/WishlistPage.jsx
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useAppSettings } from '../context/AppSettingsContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/menu/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';

export default function WishlistPage() {
  const { t } = useAppSettings();
  const { items, count } = useWishlist();
  const navigate = useNavigate();

  if (count === 0) {
    return (
      <Container maxWidth="lg">
        <SEO title={t('wishlistTitle')} description="أطباقك المفضلة في لُقمة." path="/wishlist" />
        <EmptyState
          title={t('wishlistEmpty')}
          text={t('wishlistEmptyText')}
          actionLabel={t('exploreMenu')}
          onAction={() => navigate('/menu')}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SEO title={t('wishlistTitle')} description="أطباقك المفضلة في لُقمة." path="/wishlist" />
      <Reveal>
        <Typography variant="h1" component="h1" sx={{ mb: 4 }}>{t('wishlistTitle')}</Typography>
      </Reveal>
      <ProductGrid products={items} />
    </Container>
  );
}