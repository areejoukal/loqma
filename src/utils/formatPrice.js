// src/utils/formatPrice.js
export function formatPrice(amount, lang = 'ar') {
  try {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-IL' : 'en-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₪ ${amount}`;
  }
}