// src/components/seo/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { useAppSettings } from '../../context/AppSettingsContext';

const SITE_URL = 'https://loqma-demo.vercel.app'; // عدّلها بعد النشر
const DEFAULT_IMAGE = `${SITE_URL}/images/products/grilled-chicken.jpg`;

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd = null,
}) {
  const { lang } = useAppSettings();

  const containsBrand = title && (title.includes('لُقمة') || title.includes('LOQMA'));
  const isBrandTitle = title === 'لُقمة' || title === 'LOQMA' || !title;
  const fullTitle = isBrandTitle
    ? 'لُقمة | مطعم عربي معاصر'
    : containsBrand
      ? title
      : `${title} | لُقمة`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_IL' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}