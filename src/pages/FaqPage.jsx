// src/pages/FaqPage.jsx
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSettings } from '../context/AppSettingsContext';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';
import { faqSchema } from '../utils/structuredData';

export default function FaqPage() {
  const { t } = useAppSettings();

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
    { q: t('faq8Q'), a: t('faq8A') },
  ];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <SEO
        title={t('faqTitle')}
        description="أسئلة شائعة عن لُقمة — الطلب، التوصيل، ساعات العمل."
        path="/faq"
        jsonLd={faqSchema(faqs)}
      />

      <Reveal>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 1 }}>{t('faqTitle')}</Typography>
          <Typography variant="body1" color="text.secondary">{t('faqSubtitle')}</Typography>
        </Box>
      </Reveal>

      {faqs.map((faq, i) => (
        <Reveal key={i} delay={0.05 * i}>
          <Accordion
            sx={{
              mb: 1.5,
              borderRadius: '12px !important',
              '&::before': { display: 'none' },
              border: '1px solid',
              borderColor: 'custom.border',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Reveal>
      ))}
    </Container>
  );
}