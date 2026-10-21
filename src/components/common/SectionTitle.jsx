// src/components/common/SectionTitle.jsx
import { Box, Typography } from '@mui/material';

export default function SectionTitle({ title, subtitle, align = 'start', sx }) {
  return (
    <Box sx={{ textAlign: align, mb: 3, ...sx }}>
      <Typography variant="h2" component="h2" sx={{ mb: subtitle ? 1 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}