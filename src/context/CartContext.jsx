// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProductById, getPriceWithOption, products } from '../data/products';

const STORAGE_KEY = 'loqma:cart';
const CartContext = createContext(null);

const initialState = { items: [] };

function itemKey(productId, optionId) {
  return optionId ? `${productId}__${optionId}` : productId;
}

function isValidStoredItem(it) {
  if (!it || typeof it !== 'object') return false;
  if (typeof it.productId !== 'string') return false;
  if (!Number.isInteger(it.quantity) || it.quantity < 1) return false;
  const prod = getProductById(it.productId);
  return !!prod && prod.available;
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return initialState;
    const cleaned = parsed.items.filter(isValidStoredItem).map((it) => ({
      productId: it.productId,
      optionId: it.optionId ?? null,
      quantity: Math.min(it.quantity, 99),
    }));
    return { items: cleaned };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, quantity = 1, optionId = null } = action;
      const prod = getProductById(productId);
      if (!prod || !prod.available) return state;
      const qty = Math.max(1, Math.min(99, Math.floor(quantity)));
      const key = itemKey(productId, optionId);
      const existing = state.items.find((it) => itemKey(it.productId, it.optionId) === key);
      let items;
      if (existing) {
        items = state.items.map((it) =>
          itemKey(it.productId, it.optionId) === key
            ? { ...it, quantity: Math.min(99, it.quantity + qty) }
            : it
        );
      } else {
        items = [...state.items, { productId, optionId, quantity: qty }];
      }
      return { items };
    }
    case 'INCREMENT': {
      const key = itemKey(action.productId, action.optionId ?? null);
      return {
        items: state.items.map((it) =>
          itemKey(it.productId, it.optionId) === key
            ? { ...it, quantity: Math.min(99, it.quantity + 1) }
            : it
        ),
      };
    }
    case 'DECREMENT': {
      const key = itemKey(action.productId, action.optionId ?? null);
      return {
        items: state.items
          .map((it) =>
            itemKey(it.productId, it.optionId) === key ? { ...it, quantity: it.quantity - 1 } : it
          )
          .filter((it) => it.quantity >= 1),
      };
    }
    case 'REMOVE': {
      const key = itemKey(action.productId, action.optionId ?? null);
      return { items: state.items.filter((it) => itemKey(it.productId, it.optionId) !== key) };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch { /* ignore */ }
  }, [state.items]);

  const detailedItems = useMemo(() => {
    return state.items
      .map((it) => {
        const product = getProductById(it.productId);
        if (!product) return null;
        const unitPrice = getPriceWithOption(product, it.optionId);
        return {
          key: itemKey(it.productId, it.optionId),
          product,
          optionId: it.optionId,
          option: product.options?.find((o) => o.id === it.optionId) ?? null,
          quantity: it.quantity,
          unitPrice,
          lineTotal: unitPrice * it.quantity,
        };
      })
      .filter(Boolean);
  }, [state.items]);

  const totalQuantity = useMemo(() => detailedItems.reduce((s, it) => s + it.quantity, 0), [detailedItems]);
  const totalPrice = useMemo(() => detailedItems.reduce((s, it) => s + it.lineTotal, 0), [detailedItems]);

  const value = useMemo(
    () => ({
      items: detailedItems,
      rawItems: state.items,
      totalQuantity,
      totalPrice,
      addItem: (productId, quantity = 1, optionId = null) => dispatch({ type: 'ADD', productId, quantity, optionId }),
      increment: (productId, optionId = null) => dispatch({ type: 'INCREMENT', productId, optionId }),
      decrement: (productId, optionId = null) => dispatch({ type: 'DECREMENT', productId, optionId }),
      removeItem: (productId, optionId = null) => dispatch({ type: 'REMOVE', productId, optionId }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      productsCount: products.length,
    }),
    [detailedItems, state.items, totalQuantity, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}