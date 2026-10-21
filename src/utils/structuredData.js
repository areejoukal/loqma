// src/utils/structuredData.js
const SITE_URL = 'https://loqma-demo.vercel.app';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'LOQMA | لُقمة',
  description: 'مطعم عربي معاصر — تجربة طعام رقمية',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: `${SITE_URL}/images/products/grilled-chicken.jpg`,
  servesCuisine: 'Arabic, Middle Eastern',
  priceRange: '₪₪',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Demo City',
    addressCountry: 'IL',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LOQMA | لُقمة',
  url: SITE_URL,
  inLanguage: ['ar', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/menu?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function productSchema(product, lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: product.name[lang],
    description: product.description[lang],
    image: `${SITE_URL}${product.image}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'ILS',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}