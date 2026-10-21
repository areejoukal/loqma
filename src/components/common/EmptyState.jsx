// src/components/common/EmptyState.jsx
import { Box, Button, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function EmptyState({ title, text, actionLabel, onAction, icon: Icon = RestaurantMenuIcon }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Icon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h4" component="h2">{title}</Typography>
      {text && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
          {text}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}