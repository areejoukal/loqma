# LOQMA | لُقمة

موقع Frontend تفاعلي لمطعم عربي معاصر — React 19 + Vite 8 + MUI v9.

> **نسخة تجريبية (Demo):** لا يوجد Backend، ولا تُرسل أي طلبات إلى مطعم حقيقي. الطلب في صفحة Checkout تجريبي بالكامل.

---

## الميزات

- **24 منتجًا** موزعة على 4 تصنيفات (6 لكل تصنيف).
- **بحث وتصفية** حسب التصنيف مع مزامنة URL (`/menu?category=desserts`).
- **إبراز نتائج البحث** بـ `<mark>`.
- **صفحة تفاصيل** لكل منتج مع خيارات (Size/Extras) تُغيّر السعر.
- **سلة تسوق** محفوظة في `localStorage` + **Drawer جانبي** يفتح فورًا عند الإضافة.
- **Wishlist** (مفضلة) محفوظة في `localStorage` + صفحة `/wishlist`.
- **Quick View Modal** لمعاينة سريعة من بطاقة المنتج.
- **Checkout تجريبي** مع:
  - تحقق من الحقول.
  - **كود خصم `LOQMA10`** (10%).
  - **رسوم توصيل ₪ 15** (مجانًا فوق ₪ 100).
  - رقم مرجعي تجريبي.
- **عربية (RTL)** وإنجليزية (LTR) مع تبديل فوري.
- **وضع فاتح وداكن**.
- **تصميم متجاوب** من 360px إلى 1440px+.
- **Accessibility**: تنقل بلوحة المفاتيح، تسميات، تباين، `focus-visible`.
- **صفحات إضافية**: `/about`, `/contact`, `/faq`.

---

## التقنيات

| الطبقة | التقنية |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| UI | MUI v9 + Emotion |
| Routing | React Router v7 |
| State | Context API + useReducer |
| Persistence | localStorage |
| Fonts | Alexandria, IBM Plex Sans Arabic, Inter |

---

## التشغيل المحلي

```bash
npm install
npm run dev