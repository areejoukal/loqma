// src/pages/MenuPage.jsx
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useAppSettings } from '../context/AppSettingsContext';
import { products as allProducts } from '../data/products';
import ProductGrid from '../components/menu/ProductGrid';
import ProductFilters from '../components/menu/ProductFilters';
import EmptyState from '../components/common/EmptyState';
import Reveal from '../components/common/Reveal';
import SEO from '../components/seo/SEO';

export default function MenuPage() {
  const { t, lang } = useAppSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const category = searchParams.get('category') || 'all';

  const handleCategoryChange = (newCat) => {
    if (newCat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCat });
    }
  };

  const handleReset = () => {
    setSearch('');
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (!p.available) return false;
      if (category !== 'all' && p.categoryId !== category) return false;
      if (!q) return true;
      const inName = p.name[lang].toLowerCase().includes(q);
      const inDesc = p.description[lang].toLowerCase().includes(q);
      return inName || inDesc;
    });
  }, [search, category, lang]);

  const totalAvailable = useMemo(
    () => allProducts.filter((p) => p.available).length,
    []
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SEO
        title={t('menuTitle')}
        description="قائمة طعام لُقمة — 26 طبقًا عربيًا معاصرًا. ابحث، صفّي، وأضف إلى السلة."
        path="/menu"
      />

      <Reveal>
        <Typography variant="h1" component="h1" sx={{ mb: 1 }}>{t('menuTitle')}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('menuSubtitle')}
        </Typography>
      </Reveal>

      <Reveal delay={0.1}>
        <ProductFilters
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={handleCategoryChange}
        />
      </Reveal>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {search || category !== 'all'
            ? t('showingResults', filtered.length, totalAvailable)
            : t('productsCount', filtered.length)}
        </Typography>
        {(search || category !== 'all') && (
          <Typography
            variant="body2"
            component="button"
            onClick={handleReset}
            sx={{
              background: 'none',
              border: 'none',
              color: 'primary.main',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {t('resetFilters')}
          </Typography>
        )}
      </Box>

      {filtered.length === 0 ? (
        <EmptyState
          title={t('noResults')}
          text={t('noResultsText')}
          actionLabel={t('resetFilters')}
          onAction={handleReset}
        />
      ) : (
        <ProductGrid products={filtered} searchQuery={search} gridKey={`${category}-${search}`} />
      )}
    </Container>
  );
}