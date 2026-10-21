// src/components/home/HowItWorks.jsx
import { useEffect, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';

import { useAppSettings } from '../../context/AppSettingsContext';
import { useCart } from '../../context/CartContext';
import Reveal from '../common/Reveal';

const ORDER_DONE_KEY = 'loqma:orderCompleted';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  const { t } = useAppSettings();
  const { totalQuantity } = useCart();
  const location = useLocation();
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDER_DONE_KEY);
      if (stored === 'true') setOrderCompleted(true);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (totalQuantity > 0 && orderCompleted) {
      setOrderCompleted(false);
      try { localStorage.removeItem(ORDER_DONE_KEY); } catch { /* ignore */ }
    }
  }, [totalQuantity, orderCompleted]);

  useEffect(() => {
    if (location.pathname === '/order-confirmation') {
      setOrderCompleted(true);
      try { localStorage.setItem(ORDER_DONE_KEY, 'true'); } catch { /* ignore */ }
    }
  }, [location.pathname]);

  const hasCartItems = totalQuantity > 0;
  const isOnCheckout = location.pathname === '/checkout';

  let currentStep = 1;
  if (orderCompleted) currentStep = 4;
  else if (isOnCheckout) currentStep = 3;
  else if (hasCartItems) currentStep = 2;

  const hasAnyActivity = hasCartItems || isOnCheckout || orderCompleted;

  const steps = [
    { icon: RestaurantMenuIcon, title: t('hiw1Title'), desc: t('hiw1Desc') },
    { icon: AddShoppingCartIcon, title: t('hiw2Title'), desc: t('hiw2Desc') },
    { icon: CheckCircleIcon, title: t('hiw3Title'), desc: t('hiw3Desc') },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Reveal>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            {t('hiwTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('hiwSubtitle')}
          </Typography>
        </Box>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px',
        }}
      >
        {steps.map((step, i) => {
          const stepNumber = i + 1;
          const isCompleted = hasAnyActivity && stepNumber < currentStep;
          const isCurrent = hasAnyActivity && stepNumber === currentStep;
          const isUpcoming = hasAnyActivity && stepNumber > currentStep;

          let badgeContent = null;
          if (isCompleted) badgeContent = '✓';
          else if (isCurrent) {
            badgeContent = stepNumber === 2 && totalQuantity > 0 ? totalQuantity : stepNumber;
          }

          return (
            <motion.div key={step.title} variants={item}>
              <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={isCurrent ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: isCompleted
                        ? 'success.light'
                        : isCurrent
                          ? 'custom.brandSoft'
                          : 'custom.surfaceSecondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transition: 'all 0.4s ease',
                      border: '2px solid',
                      borderColor: isCompleted
                        ? 'success.main'
                        : isCurrent
                          ? 'primary.main'
                          : 'custom.border',
                      boxShadow: isCurrent ? '0 8px 24px rgba(53, 69, 47, 0.15)' : 'none',
                    }}
                  >
                    <step.icon
                      sx={{
                        fontSize: 36,
                        color: isCompleted
                          ? 'success.main'
                          : isCurrent
                            ? 'primary.main'
                            : 'text.disabled',
                        transition: 'color 0.3s ease',
                      }}
                    />
                    {badgeContent !== null && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -6,
                          insetInlineEnd: -6,
                          minWidth: 28,
                          height: 28,
                          paddingInline: '6px',
                          borderRadius: '999px',
                          bgcolor: isCompleted ? 'success.main' : 'secondary.main',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          transition: 'all 0.3s ease',
                          animation: isCurrent ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%, 100%': { boxShadow: '0 0 0 0 rgba(185, 95, 67, 0.7)' },
                            '50%': { boxShadow: '0 0 0 8px rgba(185, 95, 67, 0)' },
                          },
                        }}
                      >
                        {badgeContent}
                      </Box>
                    )}
                  </Box>
                </motion.div>

                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    color: isUpcoming ? 'text.secondary' : 'text.primary',
                    opacity: isUpcoming ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, opacity: isUpcoming ? 0.6 : 1 }}>
                  {step.desc}
                </Typography>
              </Stack>
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
}