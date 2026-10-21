// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'loqma:wishlist';
const WishlistContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ids: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.ids)) return { ids: [] };
    const valid = parsed.ids.filter((id) => typeof id === 'string' && getProductById(id));
    return { ids: valid };
  } catch {
    return { ids: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.ids.includes(action.id);
      return { ids: exists ? state.ids.filter((x) => x !== action.id) : [...state.ids, action.id] };
    }
    case 'CLEAR':
      return { ids: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }, [state]);

  const items = useMemo(
    () => state.ids.map((id) => getProductById(id)).filter(Boolean),
    [state.ids]
  );

  const value = useMemo(
    () => ({
      ids: state.ids,
      items,
      count: items.length,
      toggle: (id) => dispatch({ type: 'TOGGLE', id }),
      isWishlisted: (id) => state.ids.includes(id),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.ids, items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}