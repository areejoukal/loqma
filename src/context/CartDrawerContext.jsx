// src/context/CartDrawerContext.jsx
import { createContext, useCallback, useContext, useState } from 'react';

const CartDrawerContext = createContext(null);

export function CartDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const toggleDrawer = useCallback(() => setOpen((v) => !v), []);

  return (
    <CartDrawerContext.Provider value={{ open, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error('useCartDrawer must be used inside CartDrawerProvider');
  return ctx;
}