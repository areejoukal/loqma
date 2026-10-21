// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import {
  lightPalette, darkPalette, statusColors, fonts,
  fontSizes, fontWeights, radii, shadows,
  componentHeights, breakpoints,
} from './tokens';

export function createAppTheme(mode = 'light', lang = 'ar') {
  const isDark = mode === 'dark';
  const isRtl = lang === 'ar';
  const p = isDark ? darkPalette : lightPalette;
  const headingFamily = isRtl ? fonts.arHeading : fonts.enBody;
  const bodyFamily = isRtl ? fonts.arBody : fonts.enBody;

  const palette = {
    mode,
    primary: {
      main: p.brandPrimary,
      dark: p.brandHover,
      contrastText: isDark ? '#1A1D16' : '#FFFFFF',
    },
    secondary: {
      main: p.accent,
      dark: p.accentHover,
      contrastText: '#FFFFFF',
    },
    background: {
      default: p.background,
      paper: p.surface,
    },
    text: {
      primary: p.textPrimary,
      secondary: p.textSecondary,
      disabled: p.textMuted,
    },
    divider: p.divider,
    success: { main: statusColors.success.text, light: statusColors.success.bg },
    error:   { main: statusColors.error.text,   light: statusColors.error.bg },
    warning: { main: statusColors.warning.text, light: statusColors.warning.bg },
    info:    { main: statusColors.info.text,    light: statusColors.info.bg },
    custom: {
      surface: p.surface,
      surfaceSecondary: p.surfaceSecondary,
      surfaceElevated: p.surfaceElevated,
      border: p.border,
      brandSoft: p.brandSoft,
      brandSubtle: p.brandSubtle,
    },
  };

  const typography = {
    fontFamily: bodyFamily,
    h1: {
      fontFamily: headingFamily,
      fontSize: { xs: '28px', sm: '32px', md: '40px' },
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: headingFamily,
      fontSize: { xs: '22px', sm: '26px', md: '32px' },
      fontWeight: fontWeights.bold,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: headingFamily,
      fontSize: { xs: '18px', sm: '20px', md: '24px' },
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: headingFamily,
      fontSize: { xs: '16px', sm: '18px', md: '20px' },
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: headingFamily,
      fontSize: { xs: '15px', sm: '16px', md: '18px' },
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.3,
    },
    body1: {
      fontFamily: bodyFamily,
      fontSize: { xs: '14px', md: '16px' },
      fontWeight: fontWeights.regular,
      lineHeight: isRtl ? 1.7 : 1.6,
    },
    body2: {
      fontFamily: bodyFamily,
      fontSize: { xs: '13px', md: '14px' },
      fontWeight: fontWeights.regular,
      lineHeight: isRtl ? 1.7 : 1.6,
    },
    caption: {
      fontFamily: bodyFamily,
      fontSize: '12px',
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
    },
    button: {
      fontFamily: bodyFamily,
      fontSize: { xs: '14px', md: '15px' },
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.4,
      textTransform: 'none',
    },
  };

  return createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
    palette,
    typography,
    shape: { borderRadius: parseInt(radii.md, 10) },
    breakpoints: { values: breakpoints },
    spacing: 4,
    shadows: [
      'none',
      shadows.card,
      shadows.card,
      shadows.card,
      shadows.cardHover,
      shadows.cardHover,
      shadows.cardHover,
      shadows.menu,
      shadows.menu,
      shadows.menu,
      shadows.menu,
      shadows.menu,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
      shadows.dialog,
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: p.background,
            color: p.textPrimary,
            fontFamily: bodyFamily,
          },
          '*': { boxSizing: 'border-box' },
          img: { maxWidth: '100%', height: 'auto', display: 'block' },
          '*:focus-visible': { outline: `2px solid ${p.brandPrimary}`, outlineOffset: 3, borderRadius: 4 },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: radii.md,
            fontFamily: bodyFamily,
            fontWeight: fontWeights.semiBold,
            textTransform: 'none',
            paddingInline: '20px',
            minHeight: componentHeights.buttonMedium,
            transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
            '&:active': { transform: 'scale(0.98)' },
          },
          containedPrimary: {
            backgroundColor: p.brandPrimary,
            color: isDark ? '#1A1D16' : '#FFFFFF',
            '&:hover': { backgroundColor: p.brandHover },
            '&:active': { backgroundColor: p.brandActive },
          },
          outlined: {
            borderColor: p.border,
            color: p.brandPrimary,
            '&:hover': { borderColor: p.brandPrimary, backgroundColor: p.brandSoft },
          },
          text: {
            color: p.brandPrimary,
            '&:hover': { backgroundColor: p.brandSoft },
          },
          sizeLarge: { minHeight: componentHeights.buttonLarge },
          sizeSmall: { minHeight: componentHeights.buttonSmall, paddingInline: '14px' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radii.lg,
            backgroundColor: p.surface,
            border: `1px solid ${p.border}`,
            boxShadow: shadows.card,
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
          },
        },
      },
      MuiCardContent: { styleOverrides: { root: { padding: '16px' } } },
      MuiTextField: { defaultProps: { variant: 'outlined', size: 'medium' } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: radii.md,
            backgroundColor: p.surface,
            minHeight: componentHeights.input,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: p.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: p.brandPrimary },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: p.brandPrimary, borderWidth: '1.5px' },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: statusColors.error.text },
          },
          input: { padding: '12px 14px', fontFamily: bodyFamily, fontSize: fontSizes.body },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { fontFamily: bodyFamily, '&.Mui-focused': { color: p.brandPrimary } },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: radii.full,
            fontFamily: bodyFamily,
            fontSize: fontSizes.caption,
            fontWeight: fontWeights.medium,
            height: 28,
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            color: p.textPrimary,
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: radii.xl, backgroundColor: p.surfaceElevated } },
      },
      MuiAlert: { styleOverrides: { root: { borderRadius: radii.md, fontFamily: bodyFamily } } },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: radii.md,
            color: p.textSecondary,
            '&:hover': { backgroundColor: p.brandSoft, color: p.brandPrimary },
          },
        },
      },
      MuiSelect: { styleOverrides: { root: { borderRadius: radii.md, fontFamily: bodyFamily } } },
    },
  });
}