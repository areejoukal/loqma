// src/app/App.jsx
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AppRouter from './router';

export default function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait" initial={false}>
        <AppRouter key={location.pathname} />
      </AnimatePresence>
    </MainLayout>
  );
}