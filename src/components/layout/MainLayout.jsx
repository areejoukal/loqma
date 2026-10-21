// src/components/layout/MainLayout.jsx
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 4, md: 6 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}