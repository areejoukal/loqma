// src/pages/ContactPage.jsx
import { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAppSettings } from '../context/AppSettingsContext';
import { useToast } from '../context/ToastContext';
import SEO from '../components/seo/SEO';
import Reveal from '../components/common/Reveal';

export default function ContactPage() {
  const { t } = useAppSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('contactNameRequired');
    if (!form.email.trim()) errs.email = t('contactEmailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('contactEmailInvalid');
    if (!form.message.trim()) errs.message = t('contactMessageRequired');
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    showToast(t('contactSuccess'));
    setForm({ name: '', email: '', message: '' });
  };

  const info = [
    { icon: LocationOnIcon, title: t('contactAddress'), value: t('footerAddressValue') },
    { icon: PhoneIcon, title: t('contactPhone'), value: t('footerPhoneValue') },
    { icon: EmailIcon, title: t('contactEmail'), value: t('footerEmailValue') },
    { icon: AccessTimeIcon, title: t('contactHours'), value: t('footerHoursValue') },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <SEO
        title={t('contactTitle')}
        description="تواصل مع لُقمة — عنوان، هاتف، بريد، ونموذج تواصل."
        path="/contact"
      />

      <Reveal>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 1 }}>{t('contactTitle')}</Typography>
          <Typography variant="body1" color="text.secondary">{t('contactSubtitle')}</Typography>
        </Box>
      </Reveal>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={2}>
          {info.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <item.icon sx={{ fontSize: 32, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.value}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </Stack>

        <Reveal delay={0.2}>
          <Card>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    label={t('contactFormName')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                  />
                  <TextField
                    label={t('contactFormEmail')}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                  />
                  <TextField
                    label={t('contactFormMessage')}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    error={!!errors.message}
                    helperText={errors.message}
                    multiline
                    rows={5}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" size="large">
                    {t('contactFormSend')}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Reveal>
      </Box>
    </Container>
  );
}