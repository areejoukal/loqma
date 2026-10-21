// src/pages/AboutPage.jsx
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSettings } from '../context/AppSettingsContext';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';

export default function AboutPage() {
  const { t, lang } = useAppSettings();

  const stats = [
    { num: '26', label: t('aboutStatDishes') },
    { num: '4', label: t('aboutStatCategories') },
    { num: '100%', label: t('aboutStatFresh') },
    { num: '2026', label: t('aboutStatYear') },
  ];

  const team = [
    { nameAr: 'أريج', nameEn: 'Areej', roleAr: 'الشيف الرئيسي', roleEn: 'Head Chef' },
    { nameAr: 'وسام', nameEn: 'Wisam', roleAr: 'مدير الجودة', roleEn: 'Quality Manager' },
    { nameAr: 'ياسمين', nameEn: 'Yasmeen', roleAr: 'مديرة التجربة', roleEn: 'Experience Manager' },
  ];

  return (
    <Box>
      <SEO
        title={t('aboutTitle')}
        description="قصة لُقمة — مطعم عربي معاصر يجمع بين الأصيل والعصري."
        path="/about"
      />

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          backgroundImage: 'url(/images/products/lamb-mansaf.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'rgba(23,26,21,0.75)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="h1" component="h1" sx={{ color: '#FAF8F2', mb: 2 }}>
              {t('aboutTitle')}
            </Typography>
            <Typography sx={{ color: 'rgba(250,248,242,0.85)', fontSize: '18px', lineHeight: 1.7 }}>
              {t('aboutSubtitle')}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Story + Stats */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <Typography variant="h2" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            {t('aboutStoryTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, textAlign: 'center', mb: 6 }}>
            {t('aboutStoryText')}
          </Typography>
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'custom.brandSoft', borderRadius: 3 }}>
                <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  {s.num}
                </Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>

      {/* Team */}
      <Box sx={{ bgcolor: 'custom.surfaceSecondary', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
              {t('aboutTeamTitle')}
            </Typography>
          </Reveal>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
            {team.map((m, i) => (
              <Reveal key={m.nameEn} delay={0.1 * i}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box
                        sx={{
                          width: 80, height: 80, borderRadius: '50%',
                          bgcolor: 'primary.main', color: '#FFF',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 32, fontWeight: 700, mx: 'auto', mb: 2,
                        }}
                      >
                        {(lang === 'ar' ? m.nameAr : m.nameEn).charAt(0)}
                      </Box>
                      <Typography variant="h4" component="h3">{lang === 'ar' ? m.nameAr : m.nameEn}</Typography>
                      <Typography variant="body2" color="text.secondary">{lang === 'ar' ? m.roleAr : m.roleEn}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}