// src/data/products.js
// 26 منتجًا — الصور المحلية في /public/images/products/

const IMG = (slug) => `/images/products/${slug}.jpg`;

export const products = [
  // ——— المقبلات (6) ———
  {
    id: 'app-001', slug: 'hummus',
    name: { ar: 'حمص بالطحينة', en: 'Hummus with Tahini' },
    description: { ar: 'حمص كريمي محضّر يوميًا، مع طحينة ناعمة، زيت زيتون بكر، وبقدونس طازج. يُقدّم مع خبز طابون دافئ.', en: 'Creamy hummus made fresh daily, with smooth tahini, extra virgin olive oil, and fresh parsley. Served with warm taboon bread.' },
    categoryId: 'appetizers', price: 18,
    image: IMG('hummus'),
    alt: { ar: 'طبق حمص بالطحينة', en: 'Hummus with tahini dish' },
    available: true, featured: true, isPopular: true,
    options: [
      { id: 'size-reg', name: { ar: 'حجم عادي', en: 'Regular' }, priceDelta: 0 },
      { id: 'size-lg', name: { ar: 'حجم كبير', en: 'Large' }, priceDelta: 6 },
      { id: 'extra-pita', name: { ar: 'خبز إضافي', en: 'Extra Pita' }, priceDelta: 3 },
    ],
  },
  {
    id: 'app-002', slug: 'mutabbal',
    name: { ar: 'متبل باذنجان', en: 'Mutabbal Eggplant' },
    description: { ar: 'باذنجان مشوي على الفحم، مع طحينة وليمون وبذور رمان. نكهة دخانية أصيلة.', en: 'Charcoal-grilled eggplant with tahini, lemon, and pomegranate seeds. Authentic smoky flavor.' },
    categoryId: 'appetizers', price: 20,
    image: IMG('mutabbal'),
    alt: { ar: 'طبق متبل باذنجان', en: 'Mutabbal eggplant dish' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'app-003', slug: 'tabbouleh',
    name: { ar: 'تبولة', en: 'Tabbouleh' },
    description: { ar: 'بقدونس طازج مفروم ناعم، برغل، طماطم، نعنع، وليمون. تُقدّم باردة.', en: 'Finely chopped fresh parsley, bulgur, tomato, mint, and lemon. Served chilled.' },
    categoryId: 'appetizers', price: 16,
    image: IMG('tabbouleh'),
    alt: { ar: 'طبق تبولة', en: 'Tabbouleh dish' },
    available: true, featured: false, isPopular: true,
  },
  {
    id: 'app-004', slug: 'falafel',
    name: { ar: 'فلافل', en: 'Falafel' },
    description: { ar: 'أقراص فلافل مقرمشة من الخارج وطرية من الداخل، مع صلصة طحينة وبقدونس.', en: 'Crispy falafel balls, tender inside, served with tahini sauce and parsley.' },
    categoryId: 'appetizers', price: 15,
    image: IMG('falafel'),
    alt: { ar: 'أقراص فلافل', en: 'Falafel balls' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'app-005', slug: 'warak-enab',
    name: { ar: 'ورق عنب', en: 'Stuffed Grape Leaves' },
    description: { ar: 'ورق عنب ملفوف بعناية، محشي أرز وخضار، مع زيت زيتون وليمون.', en: 'Carefully rolled grape leaves stuffed with rice and vegetables, with olive oil and lemon.' },
    categoryId: 'appetizers', price: 22,
    image: IMG('warak-enab'),
    alt: { ar: 'ورق عنب محشي', en: 'Stuffed grape leaves' },
    available: true, featured: true, isPopular: false,
  },
  {
    id: 'app-006', slug: 'fattoush',
    name: { ar: 'فتوش', en: 'Fattoush' },
    description: { ar: 'سلطة خضار طازجة مع خبز مقرمش، سمّاق، ودبس رمان.', en: 'Fresh vegetable salad with crispy bread, sumac, and pomegranate molasses.' },
    categoryId: 'appetizers', price: 19,
    image: IMG('fattoush'),
    alt: { ar: 'طبق فتوش', en: 'Fattoush salad' },
    available: true, featured: false, isPopular: false,
  },

  // ——— الأطباق الرئيسية (8) ———
  {
    id: 'main-001', slug: 'grilled-chicken',
    name: { ar: 'دجاج مشوي بالأعشاب', en: 'Herb Grilled Chicken' },
    description: { ar: 'نصف دجاجة مشوية على الفحم، متبلة بالزعتر وإكليل الجبل. تُقدّم مع أرز بالزعفران وخضار مشوية.', en: 'Half charcoal-grilled chicken, marinated with thyme and rosemary. Served with saffron rice and grilled vegetables.' },
    categoryId: 'main-dishes', price: 35,
    image: IMG('grilled-chicken'),
    alt: { ar: 'طبق دجاج مشوي مع الأرز', en: 'Grilled chicken with rice' },
    available: true, featured: true, isPopular: true,
    options: [
      { id: 'half', name: { ar: 'نصف دجاجة', en: 'Half Chicken' }, priceDelta: 0 },
      { id: 'whole', name: { ar: 'دجاجة كاملة', en: 'Whole Chicken' }, priceDelta: 15 },
      { id: 'extra-rice', name: { ar: 'أرز إضافي', en: 'Extra Rice' }, priceDelta: 5 },
    ],
  },
  {
    id: 'main-002', slug: 'lamb-mansaf',
    name: { ar: 'منسف لحم', en: 'Lamb Mansaf' },
    description: { ar: 'موزة لحم غنم طرية، على أرز أبيض، مع صلصة جميد، لوز وصنوبر محمّص، وخبز شريك.', en: 'Tender lamb shank on white rice, with jameed sauce, toasted almonds and pine nuts, and shrak bread.' },
    categoryId: 'main-dishes', price: 55,
    image: IMG('lamb-mansaf'),
    alt: { ar: 'طبق منسف لحم', en: 'Lamb mansaf dish' },
    available: true, featured: true, isPopular: true,
    options: [
      { id: 'single', name: { ar: 'حصة فردية', en: 'Single' }, priceDelta: 0 },
      { id: 'double', name: { ar: 'حصة مضاعفة', en: 'Double' }, priceDelta: 25 },
    ],
  },
  {
    id: 'main-003', slug: 'kebab',
    name: { ar: 'كباب لحم', en: 'Beef Kebab' },
    description: { ar: 'أسياخ كباب لحم مشوية على الفحم، مع طماطم وبصل مشوي، وبصل بالسمّاق.', en: 'Charcoal-grilled beef kebab skewers, with grilled tomato and onion, and sumac onions.' },
    categoryId: 'main-dishes', price: 45,
    image: IMG('kebab'),
    alt: { ar: 'أسياخ كباب لحم', en: 'Beef kebab skewers' },
    available: true, featured: false, isPopular: true,
  },
  {
    id: 'main-004', slug: 'shish-tawook',
    name: { ar: 'شيش طاووق', en: 'Shish Tawook' },
    description: { ar: 'قطع دجاج متبلة بالزبادي والثوم، مشوية على الفحم، مع صلصة ثوم وخبز مشوي.', en: 'Yogurt and garlic marinated chicken pieces, charcoal-grilled, with garlic sauce and grilled pita.' },
    categoryId: 'main-dishes', price: 40,
    image: IMG('shish-tawook'),
    alt: { ar: 'شيش طاووق مشوي', en: 'Grilled shish tawook' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'main-005', slug: 'musakhan',
    name: { ar: 'مسخّن', en: 'Musakhan' },
    description: { ar: 'دجاج مشوي على خبز طابون، مع بصل بالسمّاق وصنوبر محمّص. طبق فلسطيني أصيل.', en: 'Roasted chicken on taboon bread, with sumac onions and toasted pine nuts. Authentic Palestinian dish.' },
    categoryId: 'main-dishes', price: 42,
    image: IMG('musakhan'),
    alt: { ar: 'طبق مسخّن فلسطيني', en: 'Palestinian musakhan dish' },
    available: true, featured: true, isPopular: false,
  },
  {
    id: 'main-006', slug: 'maqluba',
    name: { ar: 'مقلوبة', en: 'Maqluba' },
    description: { ar: 'أرز مقلوب مع دجاج وباذنجان، garni بالصنوبر والبقدونس. يُقدّم مع لبن.', en: 'Upside-down rice with chicken and eggplant, garnished with pine nuts and parsley. Served with yogurt.' },
    categoryId: 'main-dishes', price: 38,
    image: IMG('maqluba'),
    alt: { ar: 'طبق مقلوبة', en: 'Maqluba dish' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'main-007', slug: 'shawarma-plate',
    name: { ar: 'طبق شاورما', en: 'Shawarma Plate' },
    description: { ar: 'شاورما دجاج مقطعة رقيقة، مع بطاطا مقلية، مخلل، صلصة طحينة، وخبز.', en: 'Thinly sliced chicken shawarma, with french fries, pickles, tahini sauce, and flatbread.' },
    categoryId: 'main-dishes', price: 44,
    image: IMG('shawarma-plate'),
    alt: { ar: 'طبق شاورما دجاج', en: 'Chicken shawarma plate' },
    available: false, featured: false, isPopular: true,
  },
  {
    id: 'main-008', slug: 'fish-sayadieh',
    name: { ar: 'صيادية سمك', en: 'Fish Sayadieh' },
    description: { ar: 'سمك مقلي أو مشوي، على أرز بني متبل بالكمون، مع بصل مكرمل ولوز محمّص.', en: 'Fried or grilled fish on cumin-spiced brown rice, with caramelized onions and toasted almonds.' },
    categoryId: 'main-dishes', price: 48,
    image: IMG('fish-sayadieh'),
    alt: { ar: 'طبق صيادية سمك', en: 'Fish sayadieh dish' },
    available: true, featured: false, isPopular: false,
  },

  // ——— الحلويات (6) ———
  {
    id: 'des-001', slug: 'kunafa',
    name: { ar: 'كنافة نابلسية', en: 'Nabulsi Kunafa' },
    description: { ar: 'كنافة ذهبية بالجبن، مع قطر ساخن وفستق حلبي مجروش. تُقدّم دافئة.', en: 'Golden cheese kunafa, with hot syrup and crushed pistachios. Served warm.' },
    categoryId: 'desserts', price: 25,
    image: IMG('kunafa'),
    alt: { ar: 'طبق كنافة نابلسية', en: 'Nabulsi kunafa' },
    available: true, featured: true, isPopular: true,
  },
  {
    id: 'des-002', slug: 'baklava',
    name: { ar: 'بقلاوة', en: 'Baklava' },
    description: { ar: 'بقلاوة بالفستق الحلبي، طبقات رقيقة من العجين، مع عسل وقطر.', en: 'Pistachio baklava, thin layers of phyllo, with honey and syrup.' },
    categoryId: 'desserts', price: 22,
    image: IMG('baklava'),
    alt: { ar: 'قطع بقلاوة بالفستق', en: 'Pistachio baklava pieces' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'des-003', slug: 'muhallebi',
    name: { ar: 'مهلبية', en: 'Muhallebi' },
    description: { ar: 'حلوى حليب كريمية، مع ماء ورد وفستق حلبي. تُقدّم باردة.', en: 'Creamy milk pudding, with rose water and pistachios. Served chilled.' },
    categoryId: 'desserts', price: 18,
    image: IMG('muhallebi'),
    alt: { ar: 'كوب مهلبية', en: 'Muhallebi cup' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'des-004', slug: 'basbousa',
    name: { ar: 'بسبوسة', en: 'Basbousa' },
    description: { ar: 'بسبوسة بالسميد والقطر، مع لوز محمّص. تُقدّم دافئة أو باردة.', en: 'Semolina cake with syrup, topped with roasted almonds. Served warm or cold.' },
    categoryId: 'desserts', price: 16,
    image: IMG('basbousa'),
    alt: { ar: 'قطع بسبوسة', en: 'Basbousa pieces' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'des-005', slug: 'umm-ali',
    name: { ar: 'أم علي', en: 'Umm Ali' },
    description: { ar: 'حلوى حليب بالعجين والمكسرات، مع قرفة وزبيب. تُقدّم ساخنة.', en: 'Milk pudding with pastry and nuts, with cinnamon and raisins. Served hot.' },
    categoryId: 'desserts', price: 24,
    image: IMG('umm-ali'),
    alt: { ar: 'طبق أم علي', en: 'Umm Ali dish' },
    available: true, featured: true, isPopular: false,
  },
  {
    id: 'des-006', slug: 'halawet-el-jibn',
    name: { ar: 'حلاوة الجبن', en: 'Halawet El Jibn' },
    description: { ar: 'لفائف جبن حلوة، مع قطر وفستق حلبي وورد مجفف.', en: 'Sweet cheese rolls, with syrup, pistachios, and dried rose petals.' },
    categoryId: 'desserts', price: 26,
    image: IMG('halawet-el-jibn'),
    alt: { ar: 'حلاوة الجبن', en: 'Halawet El Jibn' },
    available: true, featured: false, isPopular: false,
  },

  // ——— المشروبات (6) ———
  {
    id: 'drk-001', slug: 'mint-lemonade',
    name: { ar: 'ليمون بالنعنع', en: 'Mint Lemonade' },
    description: { ar: 'ليمون طازج مع نعنع وثلج. منعش ومثالي مع الأطباق الرئيسية.', en: 'Fresh lemon with mint and ice. Refreshing and perfect with main dishes.' },
    categoryId: 'drinks', price: 12,
    image: IMG('mint-lemonade'),
    alt: { ar: 'كوب ليمون بالنعنع', en: 'Mint lemonade glass' },
    available: true, featured: true, isPopular: true,
  },
  {
    id: 'drk-002', slug: 'arabic-coffee',
    name: { ar: 'قهوة عربية', en: 'Arabic Coffee' },
    description: { ar: 'قهوة عربية بالهيل، تُقدّم مع تمر. تقليدية وأصيلة.', en: 'Arabic coffee with cardamom, served with dates. Traditional and authentic.' },
    categoryId: 'drinks', price: 10,
    image: IMG('arabic-coffee'),
    alt: { ar: 'فنجان قهوة عربية', en: 'Arabic coffee cup' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'drk-003', slug: 'mint-tea',
    name: { ar: 'شاي بالنعنع', en: 'Mint Tea' },
    description: { ar: 'شاي أسود مع نعنع طازج. يُقدّم ساخنًا.', en: 'Black tea with fresh mint. Served hot.' },
    categoryId: 'drinks', price: 8,
    image: IMG('mint-tea'),
    alt: { ar: 'كوب شاي بالنعنع', en: 'Mint tea glass' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'drk-004', slug: 'orange-juice',
    name: { ar: 'عصير برتقال طازج', en: 'Fresh Orange Juice' },
    description: { ar: 'عصير برتقال طبيعي 100%، معصور طازجًا.', en: '100% natural orange juice, freshly squeezed.' },
    categoryId: 'drinks', price: 14,
    image: IMG('orange-juice'),
    alt: { ar: 'كوب عصير برتقال', en: 'Orange juice glass' },
    available: true, featured: true, isPopular: false,
  },
  {
    id: 'drk-005', slug: 'ayran',
    name: { ar: 'عيران', en: 'Ayran' },
    description: { ar: 'لبن مخفوق بارد مع نعنع. مهدئ ومنعش.', en: 'Cold churned yogurt drink with mint. Soothing and refreshing.' },
    categoryId: 'drinks', price: 9,
    image: IMG('ayran'),
    alt: { ar: 'كوب عيران', en: 'Ayran glass' },
    available: true, featured: false, isPopular: false,
  },
  {
    id: 'drk-006', slug: 'hibiscus',
    name: { ar: 'كركديه', en: 'Hibiscus Tea' },
    description: { ar: 'مشروب كركديه، يُقدّم باردًا أو ساخنًا. غني بالفيتامينات.', en: 'Hibiscus drink, served cold or hot. Rich in vitamins.' },
    categoryId: 'drinks', price: 10,
    image: IMG('hibiscus'),
    alt: { ar: 'كوب كركديه', en: 'Hibiscus tea glass' },
    available: true, featured: false, isPopular: false,
  },
];

export function getProductBySlug(slug) { return products.find((p) => p.slug === slug); }
export function getProductById(id) { return products.find((p) => p.id === id); }
export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return products;
  return products.filter((p) => p.categoryId === categoryId);
}
export function getDefaultOption(product) { return product.options?.[0] ?? null; }
export function getOptionById(product, optionId) {
  if (!optionId) return null;
  return product.options?.find((o) => o.id === optionId) ?? null;
}
export function getPriceWithOption(product, optionId) {
  const opt = getOptionById(product, optionId);
  return product.price + (opt?.priceDelta ?? 0);
}