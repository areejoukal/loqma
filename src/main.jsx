// src/main.jsx
import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';

import { createAppTheme } from './theme/theme';
import { getCacheForDirection } from './theme/rtl';
import { AppSettingsProvider, useAppSettings } from './context/AppSettingsContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartDrawerProvider, useCartDrawer } from './context/CartDrawerContext';
import { ToastProvider } from './context/ToastContext';
import CartDrawer from './components/cart/CartDrawer';
import App from './app/App';

import './styles/global.css';

function AppShell() {
  const { open, closeDrawer } = useCartDrawer();
  return (
    <>
      <App />
      <CartDrawer open={open} onClose={closeDrawer} />
    </>
  );
}

function ThemedApp() {
  const { mode, lang, direction } = useAppSettings();
  const cache = useMemo(() => getCacheForDirection(direction), [direction]);
  const baseTheme = useMemo(() => createAppTheme(mode, lang), [mode, lang]);
  const theme = useMemo(() => responsiveFontSizes(baseTheme), [baseTheme]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          <CartDrawerProvider>
            <AppShell />
          </CartDrawerProvider>
        </ToastProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppSettingsProvider>
          <CartProvider>
            <WishlistProvider>
              <ThemedApp />
            </WishlistProvider>
          </CartProvider>
        </AppSettingsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);