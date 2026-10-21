// src/components/menu/ProductFilters.jsx
import { Chip, Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useAppSettings } from '../../context/AppSettingsContext';
import { categories } from '../../data/categories';

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProductFilters({ search, onSearch, category, onCategory }) {
  const { t } = useAppSettings();

  const allChips = [
    { id: 'all', label: t('allCategories') },
    ...categories.map((c) => ({ id: c.id, label: t(c.nameKey) })),
  ];

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextField
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          fullWidth
          slotProps={{
            htmlInput: { 'aria-label': t('searchAriaLabel') },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <motion.div
                    animate={{ rotate: search ? [0, -10, 10, 0] : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SearchIcon />
                  </motion.div>
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onSearch('')} aria-label={t('clearSearch')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      </motion.div>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {allChips.map((chip, i) => (
          <motion.div
            key={chip.id}
            custom={i}
            variants={chipVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Chip
              label={chip.label}
              color={category === chip.id ? 'primary' : 'default'}
              onClick={() => onCategory(chip.id)}
              variant={category === chip.id ? 'filled' : 'outlined'}
              sx={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          </motion.div>
        ))}
      </Stack>
    </Stack>
  );
}