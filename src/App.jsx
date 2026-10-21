// src/app/App.jsx
import { useMemo, useState } from 'react';
import {
  Box, Button, Card, CardContent, Chip, Stack, TextField,
  Typography, Container, Switch, FormControlLabel, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';

const previewProduct = {
  nameAr: 'دجاج مشوي بالأعشاب',
  nameEn: 'Herb Grilled Chicken',
  descAr: 'دجاج مشوي يقدم مع الأرز والسلطة.',
  descEn: 'Grilled chicken served with rice and salad.',
  price: 35,
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const [mode, setMode] = useState('light');
  const theme = useTheme();
  const isRtl = lang === 'ar';

  const t = useMemo(() => ({
    title:       isRtl ? 'معاينة نظام التصميم' : 'Design System Preview',
    subtitle:    isRtl ? 'تحقق من الألوان والخطوط والأزرار والحقول في الوضعين والاتجاهين.' : 'Verify colors, fonts, buttons and inputs in both modes and directions.',
    buttons:     isRtl ? 'الأزرار' : 'Buttons',
    primary:     isRtl ? 'أضف إلى السلة' : 'Add to Cart',
    secondary:   isRtl ? 'تابع التسوق' : 'Continue Shopping',
    textBtn:     isRtl ? 'عرض التفاصيل' : 'View Details',
    inputs:      isRtl ? 'حقول الإدخال' : 'Inputs',
    nameLabel:   isRtl ? 'الاسم الكامل' : 'Full Name',
    phoneLabel:  isRtl ? 'رقم الهاتف' : 'Phone Number',
    chips:       isRtl ? 'الشارات' : 'Chips',
    chipPopular: isRtl ? 'الأكثر طلبًا' : 'Popular',
    chipNew:     isRtl ? 'جديد' : 'New',
    card:        isRtl ? 'بطاقة المنتج' : 'Product Card',
    langBtn:     isRtl ? 'English' : 'العربية',
    switchTheme: isRtl ? 'الوضع الداكن' : 'Dark Mode',
  }), [isRtl]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" sx={{ mb: 6 }}>
          <Box>
            <Typography variant="h2" component="h1">{t.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>{t.subtitle}</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControlLabel
              control={<Switch checked={mode === 'dark'} onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')} icon={<LightModeIcon />} checkedIcon={<DarkModeIcon />} />}
              label={<Typography variant="body2">{t.switchTheme}</Typography>}
            />
            <Button variant="outlined" size="small" startIcon={<LanguageIcon />} onClick={() => setLang(isRtl ? 'en' : 'ar')}>
              {t.langBtn}
            </Button>
          </Stack>
        </Stack>

        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>{t.buttons}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" startIcon={<AddShoppingCartIcon />}>{t.primary}</Button>
          <Button variant="outlined" size="large">{t.secondary}</Button>
          <Button variant="text">{t.textBtn}</Button>
        </Stack>

        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>{t.inputs}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
          <TextField label={t.nameLabel} placeholder={isRtl ? 'سارة أحمد' : 'Sarah Ahmad'} fullWidth />
          <TextField label={t.phoneLabel} placeholder="05X-XXXXXXX" fullWidth />
        </Stack>

        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>{t.chips}</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 6 }}>
          <Chip label={t.chipPopular} color="primary" />
          <Chip label={t.chipNew} color="secondary" />
        </Stack>

        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>{t.card}</Typography>
        <Card sx={{ maxWidth: 380 }}>
          <Box sx={{ aspectRatio: '4 / 3', bgcolor: theme.palette.custom.surfaceSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">4:3 Image</Typography>
          </Box>
          <CardContent>
            <Chip label={t.chipPopular} color="primary" size="small" sx={{ mb: 1 }} />
            <Typography variant="h4" component="h3">{isRtl ? previewProduct.nameAr : previewProduct.nameEn}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
              {isRtl ? previewProduct.descAr : previewProduct.descEn}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontSize: '20px', fontWeight: 700, color: 'primary.main' }}>₪ {previewProduct.price}</Typography>
              <Button variant="contained" startIcon={<AddShoppingCartIcon />} size="small">{t.primary}</Button>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 8 }}>
          <Typography variant="caption" color="text.secondary">
            {isRtl ? 'الاتجاه: RTL • الوضع: ' : 'Direction: LTR • Mode: '}{mode}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}