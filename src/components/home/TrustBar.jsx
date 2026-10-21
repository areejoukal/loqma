// src/components/home/TrustBar.jsx
import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import FreshIcon from '@mui/icons-material/LocalFlorist';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useAppSettings } from '../../context/AppSettingsContext';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TrustBar() {
  const { t } = useAppSettings();

  const items = [
    { icon: LocalShippingIcon, title: t('trustDelivery'), desc: t('trustDeliveryDesc') },
    { icon: SecurityIcon, title: t('trustSecure'), desc: t('trustSecureDesc') },
    { icon: FreshIcon, title: t('trustFresh'), desc: t('trustFreshDesc') },
    { icon: SupportAgentIcon, title: t('trustSupport'), desc: t('trustSupportDesc') },
  ];

  return (
    <Box sx={{ bgcolor: 'custom.brandSoft', borderBlock: '1px solid', borderColor: 'custom.border' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 4 }}
            sx={{ flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}
          >
            {items.map((it) => (
              <motion.div key={it.title} variants={item}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flex: '1 1 200px' }}>
                  <it.icon sx={{ fontSize: 32, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{it.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{it.desc}</Typography>
                  </Box>
                </Stack>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}