// src/components/menu/ProductCardSkeleton.jsx
import { Box, Card, CardContent, Skeleton } from '@mui/material';

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" sx={{ aspectRatio: '4 / 3', width: '100%', height: 'auto' }} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="75%" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Skeleton variant="text" width="30%" height={32} />
          <Skeleton variant="rounded" width={100} height={32} />
        </Box>
      </CardContent>
    </Card>
  );
}