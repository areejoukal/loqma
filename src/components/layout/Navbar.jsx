// src/components/layout/Navbar.jsx
import { useState } from 'react';
import {
  AppBar, Badge, Box, Button, Container, Divider, Drawer, IconButton, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAppSettings } from '../../context/AppSettingsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCartDrawer } from '../../context/CartDrawerContext';

const drawerVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Navbar() {
  const { t, mode, toggleMode, toggleLang, lang } = useAppSettings();
  const { totalQuantity } = useCart();
  const { count: wishCount } = useWishlist();
  const { openDrawer } = useCartDrawer();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { to: '/', label: t('navHome'), icon: HomeOutlinedIcon },
    { to: '/menu', label: t('navMenu'), icon: RestaurantMenuOutlinedIcon },
    { to: '/about', label: t('navAbout'), icon: InfoOutlinedIcon },
    { to: '/contact', label: t('navContact'), icon: ContactMailOutlinedIcon },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor:
          mode === 'dark' ? 'rgba(23, 26, 21, 0.85)' : 'rgba(250, 248, 242, 0.85)',
        borderBottom: '1px solid',
        borderColor: 'custom.border',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 60, md: 76 }, justifyContent: 'space-between', gap: 1 }}
        >
          <IconButton
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            onClick={() => setMobileMenu(true)}
            aria-label={t('menuAriaLabel')}
            size="small"
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Logo height={48} />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.to;
              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <Button
                    component={RouterLink}
                    to={item.to}
                    color={isActive ? 'primary' : 'inherit'}
                    sx={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: { sm: '13px', md: '15px' },
                      position: 'relative',
                      '&::after': isActive
                        ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 4,
                            insetInline: 12,
                            height: 2,
                            borderRadius: 2,
                            backgroundColor: 'primary.main',
                          }
                        : undefined,
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={toggleMode} aria-label={t('toggleTheme')} size="small">
                {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={toggleLang} aria-label={t('switchLanguage')} size="small">
                <LanguageIcon fontSize="small" />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton component={RouterLink} to="/wishlist" aria-label={t('wishlistTitle')} size="small">
                <Badge badgeContent={wishCount} color="error" max={99}>
                  <FavoriteBorderIcon fontSize="small" />
                </Badge>
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={openDrawer} aria-label={t('cartAriaLabel')} size="small">
                <Badge badgeContent={totalQuantity} color="secondary" max={99}>
                  <ShoppingBagOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </Container>

      <AnimatePresence>
        {mobileMenu && (
          <Drawer
            anchor="left"
            open={mobileMenu}
            onClose={() => setMobileMenu(false)}
            PaperProps={{
              component: motion.div,
              variants: drawerVariants,
              initial: 'hidden',
              animate: 'visible',
              exit: 'exit',
              sx: {
                width: { xs: '85%', sm: 320 },
                maxWidth: 360,
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            {/* رأس Drawer — بدون أي مسافة بين الشعار والنص */}
            <Box
              sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #35452F 0%, #202D1D 100%)',
                color: '#FAF8F2',
                p: 3,
                pt: 4,
              }}
            >
              <IconButton
                onClick={() => setMobileMenu(false)}
                aria-label={t('close')}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  insetInlineEnd: 8,
                  color: '#FAF8F2',
                  '&:hover': { backgroundColor: 'rgba(250, 248, 242, 0.15)' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box
                  component={RouterLink}
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  sx={{ display: 'block', lineHeight: 0, mb: 0 }}
                >
                  <Logo height={44} forceWhite />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'rgba(250, 248, 242, 0.8)',
                    m: 0,
                    p: 0,
                    lineHeight: 1,
                  }}
                >
                  {lang === 'ar' ? 'مطعم عربي معاصر' : 'Modern Arabic Restaurant'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
              <List sx={{ px: 1 }}>
                {navItems.map((item, i) => {
                  const isActive = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      custom={i}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={item.to}
                          onClick={() => setMobileMenu(false)}
                          sx={{
                            borderRadius: 2,
                            mx: 1,
                            mb: 0.5,
                            py: 1.5,
                            backgroundColor: isActive ? 'custom.brandSoft' : 'transparent',
                            color: isActive ? 'primary.main' : 'text.primary',
                            '&:hover': { backgroundColor: 'custom.brandSoft' },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 40,
                              color: isActive ? 'primary.main' : 'text.secondary',
                            }}
                          >
                            <Icon />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontWeight: isActive ? 700 : 500,
                              fontSize: '16px',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </motion.div>
                  );
                })}
              </List>

              <Divider sx={{ my: 2, mx: 2 }} />

              <List sx={{ px: 1 }}>
                <motion.div
                  custom={navItems.length}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      component={RouterLink}
                      to="/wishlist"
                      onClick={() => setMobileMenu(false)}
                      sx={{ borderRadius: 2, mx: 1, mb: 0.5, py: 1.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Badge badgeContent={wishCount} color="error" max={99}>
                          <FavoriteBorderIcon sx={{ color: 'text.secondary' }} />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={t('wishlistTitle')}
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '16px' }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>

                <motion.div
                  custom={navItems.length + 1}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setMobileMenu(false);
                        openDrawer();
                      }}
                      sx={{ borderRadius: 2, mx: 1, py: 1.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Badge badgeContent={totalQuantity} color="secondary" max={99}>
                          <ShoppingBagOutlinedIcon sx={{ color: 'text.secondary' }} />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={t('navCart')}
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '16px' }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              </List>
            </Box>

            <Box sx={{ borderTop: '1px solid', borderColor: 'custom.border', p: 2 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  onClick={toggleMode}
                  size="small"
                >
                  {mode === 'dark' ? 'Light' : t('switchTheme')}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LanguageIcon />}
                  onClick={toggleLang}
                  size="small"
                >
                  {t('switchLanguage')}
                </Button>
              </Stack>
            </Box>
          </Drawer>
        )}
      </AnimatePresence>
    </AppBar>
  );
}