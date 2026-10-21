// src/theme/tokens.js
// المصدر الوحيد لكل قيم التصميم — من وثيقة هوية LOQMA v1.0

export const colors = {
  brandPrimary: '#35452F',
  brandHover: '#293725',
  brandActive: '#202D1D',
  brandSoft: '#E8EDE3',
  brandSubtle: '#F2F4EE',
  accent: '#B95F43',
  accentHover: '#9E4D35',
};

export const lightPalette = {
  background: '#FAF8F2',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F0E8',
  surfaceElevated: '#FFFFFF',
  textPrimary: '#252820',
  textSecondary: '#666B60',
  textMuted: '#85897F',
  border: '#E4E0D6',
  divider: '#EAE6DE',
  disabled: '#B9BDB4',
  brandPrimary: '#35452F',
  brandHover: '#293725',
  brandActive: '#202D1D',
  brandSoft: '#E8EDE3',
  brandSubtle: '#F2F4EE',
  accent: '#B95F43',
  accentHover: '#9E4D35',
};

export const darkPalette = {
  background: '#171A15',
  surface: '#20241D',
  surfaceSecondary: '#292E25',
  surfaceElevated: '#30362B',
  textPrimary: '#F5F2E9',
  textSecondary: '#C0C4B8',
  textMuted: '#9DA396',
  border: '#3B4235',
  divider: '#33392F',
  disabled: '#4A5145',
  brandPrimary: '#A5B995',
  brandHover: '#B8C9A9',
  brandActive: '#8FA37F',
  brandSoft: '#30392B',
  brandSubtle: '#252B22',
  accent: '#E69A7D',
  accentHover: '#F0B19A',
};

export const statusColors = {
  success: { text: '#276749', bg: '#E6F4EA' },
  error:   { text: '#B42318', bg: '#FDECEC' },
  warning: { text: '#8A5A00', bg: '#FFF3D6' },
  info:    { text: '#315B7D', bg: '#EAF2F8' },
};

export const fonts = {
  arHeading: '"Alexandria", "IBM Plex Sans Arabic", sans-serif',
  arBody:    '"IBM Plex Sans Arabic", "Alexandria", sans-serif',
  enBody:    '"Inter", "IBM Plex Sans Arabic", sans-serif',
};

export const fontSizes = {
  display:   '48px',
  h1:        '40px',
  h2:        '32px',
  h3:        '24px',
  h4:        '20px',
  h5:        '18px',
  bodyLarge: '18px',
  body:      '16px',
  bodySmall: '14px',
  caption:   '12px',
  button:    '15px',
  price:     '20px',
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  full: '999px',
};

export const shadows = {
  card: '0 1px 3px rgba(37, 40, 32, 0.06), 0 1px 2px rgba(37, 40, 32, 0.04)',
  cardHover: '0 12px 24px rgba(37, 40, 32, 0.10), 0 4px 8px rgba(37, 40, 32, 0.06)',
  menu: '0 12px 32px rgba(37, 40, 32, 0.14)',
  dialog: '0 24px 64px rgba(37, 40, 32, 0.20)',
};

export const componentHeights = {
  buttonLarge: 52,
  buttonMedium: 44,
  buttonSmall: 36,
  input: 48,
  navbarDesktop: 76,
  navbarMobile: 64,
};

export const breakpoints = {
  xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536,
};