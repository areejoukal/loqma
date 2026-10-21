// src/components/common/QuantityControl.jsx
import { IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppSettings } from '../../context/AppSettingsContext';

export default function QuantityControl({ value, onIncrement, onDecrement, min = 1, max = 99, size = 'medium' }) {
  const { t } = useAppSettings();

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'custom.border',
        borderRadius: 2,
        width: 'fit-content',
      }}
    >
      <IconButton
        size={size}
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={t('decreaseQty')}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{value}</Typography>
      <IconButton
        size={size}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={t('increaseQty')}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}