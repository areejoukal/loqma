// src/pages/HomePage.jsx
import { Box, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PaymentIcon from '@mui/icons-material/Payment';

import { useAppSettings } from '../context/AppSettingsContext';
import { products } from '../data/products';
import ProductGrid from '../components/menu/ProductGrid';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/common/Reveal';
import SEO from '../components/seo/SEO';
import { organizationSchema, websiteSchema } from '../utils/structuredData';

import HeroBanner from '../components/home/HeroBanner';
import TrustBar from '../components/home/TrustBar';
import HowItWorks from '../components/home/HowItWorks';
import CategoriesGrid from '../components/home/CategoriesGrid';
import PromoBanner from '../components/home/PromoBanner';
import GalleryStrip from '../components/home/GalleryStrip';
import Testimonials from '../components/home/Testimonials';

export default function HomePage() {
  const { t } = useAppSettings();

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const popular = products.filter((p) => p.isPopular).slice(0, 4);

  const features = [
    { icon: RestaurantIcon, title: t('why1Title'), text: t('why1Text') },
    { icon: LocalDiningIcon, title: t('why2Title'), text: t('why2Text') },
    { icon: PaymentIcon, title: t('why3Title'), text: t('why3Text') },
  ];

  return (
    <Box>
      <SEO
        title={t('brandName')}
        description="مطعم عربي معاصر. استكشف القائمة، أضف الأطباق للسلة، وأكمل تجربة طلب سهلة."
        path="/"
        jsonLd={[organizationSchema, websiteSchema]}
      />

      <HeroBanner />
      <TrustBar />
      <HowItWorks />
      <CategoriesGrid />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <SectionTitle title={t('featuredTitle')} subtitle={t('featuredSubtitle')} />
        </Reveal>
        <ProductGrid products={featured} />
        <Reveal delay={0.15}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button component={RouterLink} to="/menu" variant="outlined" size="large">
              {t('viewAllMenu')}
            </Button>
          </Box>
        </Reveal>
      </Container>

      <PromoBanner />

      <Box sx={{ bgcolor: 'custom.surfaceSecondary', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <SectionTitle title={t('popularTitle')} subtitle={t('popularSubtitle')} />
          </Reveal>
          <ProductGrid products={popular} />
        </Container>
      </Box>

      <GalleryStrip />
      <Testimonials />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <SectionTitle title={t('whyTitle')} align="center" />
        </Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={0.1 * i}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ height: '100%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <f.icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" component="h3" sx={{ mb: 1 }}>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{f.text}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}