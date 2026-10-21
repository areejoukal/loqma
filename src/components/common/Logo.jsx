// src/components/common/Logo.jsx
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSettings } from '../../context/AppSettingsContext';

export default function Logo({ height = 44, forceWhite = false, sx = {} }) {
  const { t, lang, mode } = useAppSettings();

  const logoSrc = lang === 'ar'
  ? '/images/branding/logo-ar.png'
  : '/images/branding/logo-en.png';
  const shouldInvert = forceWhite || mode === 'dark';

  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label={t('brandName')}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt={t('brandName')}
        sx={{
          height: { xs: height * 0.85, md: height },
          width: 'auto',
          display: 'block',
          filter: shouldInvert ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      />
    </Box>
  );
}