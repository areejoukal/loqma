// src/theme/rtl.js
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';

export const ltrCache = createCache({ key: 'muiltr', stylisPlugins: [prefixer] });
export const rtlCache = createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] });

export function getCacheForDirection(direction) {
  return direction === 'rtl' ? rtlCache : ltrCache;
}