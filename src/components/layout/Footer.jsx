// src/components/layout/Footer.jsx
import {
  Box, Button, Container, Divider, IconButton, Link, Stack, TextField, Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

import Logo from '../common/Logo';
import Reveal from '../common/Reveal';
import { useAppSettings } from '../../context/AppSettingsContext';
import { useToast } from '../../context/ToastContext';

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Footer() {
  const { t } = useAppSettings();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: t('navHome') },
    { to: '/menu', label: t('navMenu') },
    { to: '/about', label: t('navAbout') },
    { to: '/contact', label: t('navContact') },
    { to: '/faq', label: t('navFaq') },
  ];

  const categoryLinks = [
    { to: '/menu?category=appetizers', label: t('catAppetizers') },
    { to: '/menu?category=main-dishes', label: t('catMainDishes') },
    { to: '/menu?category=desserts', label: t('catDesserts') },
    { to: '/menu?category=drinks', label: t('catDrinks') },
  ];

  const socials = [
    { icon: InstagramIcon, href: 'https://www.instagram.com', label: 'Instagram' },
    { icon: FacebookIcon, href: 'https://www.facebook.com', label: 'Facebook' },
    { icon: XIcon, href: 'https://x.com', label: 'X' },
    { icon: YouTubeIcon, href: 'https://www.youtube.com', label: 'YouTube' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast(t('newsletterInvalidEmail'), 'error');
      return;
    }
    showToast(t('newsletterSuccess'));
    setEmail('');
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'custom.surfaceSecondary',
        borderTop: '1px solid',
        borderColor: 'custom.border',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Newsletter */}
        <Reveal>
          <Box
            sx={{
              py: { xs: 3.5, md: 5 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, md: 3 },
              borderBottom: '1px solid',
              borderColor: 'custom.border',
            }}
          >
            <Box sx={{ maxWidth: 480 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 0.5, fontSize: { xs: '20px', md: '24px' } }}
              >
                {t('footerNewsletterTitle')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '13px', md: '14px' } }}>
                {t('footerNewsletterSubtitle')}
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                width: { xs: '100%', md: 420 },
              }}
            >
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                size="small"
                fullWidth
                slotProps={{ htmlInput: { 'aria-label': t('newsletterPlaceholder') } }}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                sx={{
                  flexShrink: 0,
                  minWidth: { xs: '100%', sm: 120 },
                  py: { xs: 1.2, sm: 1 },
                }}
              >
                {t('newsletterBtn')}
              </Button>
            </Box>
          </Box>
        </Reveal>

        {/* Main columns */}
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          sx={{
            pt: { xs: 4, md: 5 },
            pb: { xs: 4, md: 5 },
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          {/* Brand — بدون أي مسافة بين الشعار والأيقونات */}
          <Box sx={{ gridColumn: { xs: 'span 3', sm: 'span 3', md: 'span 1' } }}>
            <motion.div custom={0} variants={columnVariants}>
              <Box sx={{ display: 'block', lineHeight: 0, mb: 0 }}>
                <Logo height={40} />
              </Box>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ flexWrap: 'wrap', gap: 0.5, mt: 0, lineHeight: 0 }}
              >
                {socials.map((s) => (
                  <motion.div key={s.label} whileHover={{ scale: 1.15, y: -2 }} transition={{ duration: 0.2 }}>
                    <IconButton
                      component="a"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      size="small"
                      sx={{
                        border: '1px solid',
                        borderColor: 'custom.border',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                      }}
                    >
                      <s.icon fontSize="small" />
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Quick Links */}
          <Box>
            <motion.div custom={1} variants={columnVariants}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: '13px', sm: '14px', md: '16px' } }}
              >
                {t('footerQuickLinks')}
              </Typography>
              <Stack spacing={{ xs: 0.75, md: 1.25 }}>
                {quickLinks.map((l) => (
                  <motion.div key={l.to} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      component={RouterLink}
                      to={l.to}
                      underline="hover"
                      color="text.secondary"
                      variant="body2"
                      sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '12px', sm: '13px', md: '14px' } }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Categories */}
          <Box>
            <motion.div custom={2} variants={columnVariants}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: '13px', sm: '14px', md: '16px' } }}
              >
                {t('footerCategories')}
              </Typography>
              <Stack spacing={{ xs: 0.75, md: 1.25 }}>
                {categoryLinks.map((l) => (
                  <motion.div key={l.to} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      component={RouterLink}
                      to={l.to}
                      underline="hover"
                      color="text.secondary"
                      variant="body2"
                      sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '12px', sm: '13px', md: '14px' } }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* Contact */}
          <Box>
            <motion.div custom={3} variants={columnVariants}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: '13px', sm: '14px', md: '16px' } }}
              >
                {t('footerContact')}
              </Typography>
              <Stack spacing={{ xs: 1, md: 1.5 }}>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' } }}>
                    {t('footerAddressValue')}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                  <PhoneIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
                  <Link
                    href="tel:0592000000"
                    underline="hover"
                    color="text.secondary"
                    variant="body2"
                    dir="ltr"
                    sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' } }}
                  >
                    {t('footerPhoneValue')}
                  </Link>
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                  <EmailIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
                  <Link
                    href="mailto:hello@loqma.restaurant"
                    underline="hover"
                    color="text.secondary"
                    variant="body2"
                    sx={{ fontSize: { xs: '11px', sm: '12px', md: '14px' }, wordBreak: 'break-all' }}
                  >
                    {t('footerEmailValue')}
                  </Link>
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
                  <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' } }}>
                    {t('footerHoursValue')}
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ py: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', md: '13px' } }}>
            © {year} {t('footerRights')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}