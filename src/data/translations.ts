export type Language = 'en' | 'ur' | 'ar';

export interface Translations {
  brandName: string;
  tagline: string;
  callNow: string;
  orderNow: string;
  whatsappOrder: string;
  menu: string;
  familyPackages: string;
  tableReservation: string;
  trackOrder: string;
  reviews: string;
  dashboard: string;
  cart: string;
  buyNow: string;
  addToCart: string;
  addedToCart: string;
  allCategories: string;
  pizzas: string;
  deals: string;
  grilledBurgers: string;
  crispyBurgers: string;
  sandwiches: string;
  shawarmaRolls: string;
  periPeri: string;
  sidesWings: string;
  dipsDrinks: string;
  searchPlaceholder: string;
  price: string;
  selectSize: string;
  selectCrust: string;
  specialInstructions: string;
  minOrderNotice: string;
  freeDeliveryNotice: string;
  deliveryTime: string;
  subtotal: string;
  deliveryFee: string;
  free: string;
  discount: string;
  total: string;
  checkout: string;
  yourCartEmpty: string;
  exploreMenu: string;
  cashOnDelivery: string;
  creditCard: string;
  easyPaisa: string;
  jazzCash: string;
  payoneer: string;
  sadaPay: string;
  nayaPay: string;
  bankTransfer: string;
  moneyBackGuarantee: string;
  placeOrder: string;
  bookTableNow: string;
  reservationTitle: string;
  partySize: string;
  date: string;
  timeSlot: string;
  seatingArea: string;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  orderTrackingTitle: string;
  orderStatus: string;
  orderReceived: string;
  kitchenPreparing: string;
  doughBaking: string;
  riderAssigned: string;
  onTheWay: string;
  delivered: string;
  liveMapTracking: string;
  reviewsTitle: string;
  leaveReview: string;
  submitFeedback: string;
  darkLightMode: string;
  privacyPolicy: string;
  securityAssurance: string;
  addressLabel: string;
  openingHours: string;
  pizzaPoints: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: 'The Pizza Shop',
    tagline: 'Changing Fast Food For Good · Paragon City Lahore',
    callNow: 'Direct Call',
    orderNow: 'Order Now',
    whatsappOrder: 'WhatsApp Order',
    menu: 'Menu',
    familyPackages: 'Family Packages (10)',
    tableReservation: 'Book Table',
    trackOrder: 'Track Order',
    reviews: 'Reviews & Ratings',
    dashboard: 'Dashboard',
    cart: 'My Cart',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    allCategories: 'All Menu',
    pizzas: 'Pizzas',
    deals: 'Deals & Combos',
    grilledBurgers: 'Grilled Burgers',
    crispyBurgers: 'Crispy Burgers',
    sandwiches: 'Sandwiches',
    shawarmaRolls: 'Shawarma & Rolls',
    periPeri: 'Peri Peri Chicken',
    sidesWings: 'Sides & Wings',
    dipsDrinks: 'Dips & Beverages',
    searchPlaceholder: 'Search pizza, burger, deal, shawarma...',
    price: 'Rs.',
    selectSize: 'Select Size',
    selectCrust: 'Select Crust Style',
    specialInstructions: 'Special kitchen instructions (optional)',
    minOrderNotice: 'Min. delivery order is Rs. 350',
    freeDeliveryNotice: 'Free home delivery on orders over Rs. 1,200',
    deliveryTime: '35 - 45 mins average delivery time',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    free: 'FREE',
    discount: 'Promo Discount',
    total: 'Grand Total',
    checkout: 'Proceed to Checkout',
    yourCartEmpty: 'Your food basket is empty',
    exploreMenu: 'Explore Fresh Menu',
    cashOnDelivery: 'Cash on Delivery (COD)',
    creditCard: 'Credit / Debit Card',
    easyPaisa: 'EasyPaisa Wallet',
    jazzCash: 'JazzCash Mobile',
    payoneer: 'Payoneer Balance / Card',
    sadaPay: 'SadaPay App',
    nayaPay: 'NayaPay Wallet',
    bankTransfer: 'Direct Bank / Raast',
    moneyBackGuarantee: '100% Money-Back & Safe Delivery Guarantee',
    placeOrder: 'Confirm & Place Order',
    bookTableNow: 'Reserve Dine-In Table',
    reservationTitle: 'Dine-In Table Reservation',
    partySize: 'Number of Guests',
    date: 'Reservation Date',
    timeSlot: 'Preferred Time Slot',
    seatingArea: 'Seating Preference',
    customerName: 'Full Name',
    phoneNumber: 'Phone Number (for SMS confirmation)',
    deliveryAddress: 'Complete Delivery Address in Lahore',
    orderTrackingTitle: 'Real-Time Order & Delivery Radar',
    orderStatus: 'Delivery Status',
    orderReceived: 'Order Placed & Verified',
    kitchenPreparing: 'Chef Searing & Prepping',
    doughBaking: 'Stone Oven Baking Crust',
    riderAssigned: 'Rider Dispatched',
    onTheWay: 'Rider On The Way (Barki Rd)',
    delivered: 'Delivered Hot & Fresh!',
    liveMapTracking: 'Live GPS Delivery Route',
    reviewsTitle: 'Verified Customer Reviews',
    leaveReview: 'Share Your Experience',
    submitFeedback: 'Submit Review',
    darkLightMode: 'Theme',
    privacyPolicy: 'Privacy & Security Protocols',
    securityAssurance: '256-Bit SSL Encrypted & Secured',
    addressLabel: 'Latif Market, Opp. Gate Imperial Garden Homes, Paragon City, Barki Road, Lahore',
    openingHours: 'Open Daily: 12:00 PM – 2:00 AM (Midnight Deals 12:30 – 1:30 AM)',
    pizzaPoints: 'Pizza Loyalty Points'
  },
  ur: {
    brandName: 'دی پیزا شاپ',
    tagline: 'بہترین ذائقہ اور معیار · پیراگون سٹی برکی روڈ لاہور',
    callNow: 'ڈائریکٹ کال کریں',
    orderNow: 'ابھی آرڈر کریں',
    whatsappOrder: 'واٹس ایپ آرڈر',
    menu: 'مکمل مینو',
    familyPackages: 'فیملی پیکجز (10 قسم)',
    tableReservation: 'ٹیبل بک کروائیں',
    trackOrder: 'لائیو آرڈر ٹریک کریں',
    reviews: 'کسٹمر ریویوز',
    dashboard: 'ڈیش بورڈ',
    cart: 'میری ٹوکری',
    buyNow: 'ابھی خریدیں',
    addToCart: 'ٹوکری میں شامل کریں',
    addedToCart: 'ٹوکری میں شامل ہو گیا',
    allCategories: 'تمام آئٹمز',
    pizzas: 'پیزا ورائٹی',
    deals: 'اسپیشل ڈیلز اور کمبوز',
    grilledBurgers: 'گرلڈ برگرز',
    crispyBurgers: 'کرسپی برگرز',
    sandwiches: 'سینڈوچز',
    shawarmaRolls: 'شاورما اور رولز',
    periPeri: 'پیری پیری چکن',
    sidesWings: 'ونگز اور فرائز',
    dipsDrinks: 'سوسز اور مشروبات',
    searchPlaceholder: 'پیزا، برگر، شاورما یا ڈیل تلاش کریں...',
    price: 'روپے',
    selectSize: 'سائز منتخب کریں',
    selectCrust: 'کرسٹ کا انتخاب کریں',
    specialInstructions: 'باورچی خانے کے لیے خصوصی ہدایت (اختیاری)',
    minOrderNotice: 'کم از کم ہوم ڈلیوری آرڈر 350 روپے ہے',
    freeDeliveryNotice: '1200 روپے سے زائد کے آرڈر پر مفت ڈلیوری',
    deliveryTime: 'ڈلیوری کا وقت: 35 سے 45 منٹ',
    subtotal: 'ذیلی کل رقم',
    deliveryFee: 'ڈلیوری چارجز',
    free: 'مفت',
    discount: 'رعایت',
    total: 'کل رقم',
    checkout: 'چیک آؤٹ پر جائیں',
    yourCartEmpty: 'آپ کی ٹوکری خالی ہے',
    exploreMenu: 'تازہ مینو دیکھیں',
    cashOnDelivery: 'کیش آن ڈلیوری (COD)',
    creditCard: 'کریڈٹ / ڈیبٹ کارڈ',
    easyPaisa: 'ایزی پیسہ والیٹ',
    jazzCash: 'جاز کیش',
    payoneer: 'پایئونیر والیٹ / کارڈ',
    sadaPay: 'سادہ پے ایپ',
    nayaPay: 'نیا پے والیٹ',
    bankTransfer: 'بینک ٹرانسفر / راست',
    moneyBackGuarantee: '100٪ رقم کی واپسی اور محفوظ ترین ڈلیوری گارنٹی',
    placeOrder: 'آرڈر کنفرم کریں',
    bookTableNow: 'ٹیبل ریزرو کریں',
    reservationTitle: 'ریستوران میں ٹیبل بکنگ',
    partySize: 'مہمانوں کی تعداد',
    date: 'تاریخ',
    timeSlot: 'پسندیدہ وقت',
    seatingArea: 'بیٹھنے کا ایریا',
    customerName: 'پورا نام',
    phoneNumber: 'فون نمبر',
    deliveryAddress: 'لاہور میں ڈلیوری کا مکمل پتہ',
    orderTrackingTitle: 'لائیو آرڈر اور رائیڈر ٹریکنگ',
    orderStatus: 'آرڈر کی صورتحال',
    orderReceived: 'آرڈر وصول ہو گیا',
    kitchenPreparing: 'باورچی خانے میں تیاری',
    doughBaking: 'اوون میں تازہ پیزا تیار ہو رہا ہے',
    riderAssigned: 'رائیڈر روانہ',
    onTheWay: 'رائیڈر برکی روڈ پر راستے میں ہے',
    delivered: 'گرم اور تازہ ڈلیور ہو گیا!',
    liveMapTracking: 'لائیو جی پی ایس روٹ نقشہ',
    reviewsTitle: 'مطمئن صارفین کے تاثرات',
    leaveReview: 'اپنی رائے شیئر کریں',
    submitFeedback: 'ریویو جمع کروائیں',
    darkLightMode: 'ڈارک / لائٹ موڈ',
    privacyPolicy: 'پرائیویسی پالیسی اور سیکیورٹی',
    securityAssurance: '256 بٹ محفوظ اور انکرپٹڈ سیکیورٹی',
    addressLabel: 'لطیف مارکیٹ، سامنے گیٹ امپیریل گارڈن ہومز، پیراگون سٹی، برکی روڈ، لاہور',
    openingHours: 'روزانہ اوقات: دوپہر 12 بجے تا رات 2 بجے (مڈ نائٹ ڈیلز 12:30 تا 1:30 بجے)',
    pizzaPoints: 'پیزا لائلٹی پوائنٹس'
  },
  ar: {
    brandName: 'ذا بيتزا شوب',
    tagline: 'أشهى بيتزا وبرجر · لاهور، باراغون سيتي',
    callNow: 'اتصال مباشر',
    orderNow: 'اطلب الآن',
    whatsappOrder: 'طلب عبر واتساب',
    menu: 'قائمة الطعام',
    familyPackages: 'الباقات العائلية (10 أصناف)',
    tableReservation: 'حجز طاولة',
    trackOrder: 'تتبع الطلب مباشرة',
    reviews: 'التقييمات والآراء',
    dashboard: 'لوحة التحكم',
    cart: 'سلتي',
    buyNow: 'شراء فوري',
    addToCart: 'أضف للسلة',
    addedToCart: 'تمت الإضافة للسلة',
    allCategories: 'جميع الأصناف',
    pizzas: 'بيتزا',
    deals: 'عروض عائلية وتوفير',
    grilledBurgers: 'برجر مشوي',
    crispyBurgers: 'برجر مقرمش',
    sandwiches: 'شطائر وسندويتشات',
    shawarmaRolls: 'شاورما ورولات',
    periPeri: 'دجاج بيري بيري مشوي',
    sidesWings: 'أجنحة وبطاطس مقلية',
    dipsDrinks: 'صلصات ومشروبات',
    searchPlaceholder: 'ابحث عن بيتزا، برجر، شاورما...',
    price: 'روبية',
    selectSize: 'اختر الحجم',
    selectCrust: 'اختر نوع العجينة',
    specialInstructions: 'ملاحظات خاصة للمطبخ',
    minOrderNotice: 'الحد الأدنى للطلب 350 روبية',
    freeDeliveryNotice: 'توصيل مجاني للطلبات فوق 1,200 روبية',
    deliveryTime: 'وقت التوصيل: 35 إلى 45 دقيقة',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'رسوم التوصيل',
    free: 'مجاناً',
    discount: 'خصم العرض',
    total: 'المجموع الإجمالي',
    checkout: 'إتمام الطلب',
    yourCartEmpty: 'سلة المشتريات فارغة',
    exploreMenu: 'تصفح قائمة الطعام',
    cashOnDelivery: 'الدفع عند الاستلام (COD)',
    creditCard: 'بطاقة ائتمان / مدى',
    easyPaisa: 'محفظة إيزي بيسا',
    jazzCash: 'جاز كاش',
    payoneer: 'بايونير / بطاقة دولية',
    sadaPay: 'تطبيق ساده باي',
    nayaPay: 'محفظة نايا باي',
    bankTransfer: 'تحويل بنكي مباشر / راست',
    moneyBackGuarantee: 'ضمان استرجاع الأموال 100% والتوصيل الآمن',
    placeOrder: 'تأكيد وإرسال الطلب',
    bookTableNow: 'حجز طاولة صالة',
    reservationTitle: 'حجز طاولة مطعم',
    partySize: 'عدد الضيوف',
    date: 'التاريخ',
    timeSlot: 'الوقت المفضل',
    seatingArea: 'مكان الجلوس المفضل',
    customerName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف للتأكيد',
    deliveryAddress: 'عنوان التوصيل بالتفصيل في لاهور',
    orderTrackingTitle: 'رادار تتبع الطلب المباشر',
    orderStatus: 'حالة الطلب',
    orderReceived: 'تم استلام الطلب',
    kitchenPreparing: 'جارِ تحضير المكونات',
    doughBaking: 'في الفرن الحجري',
    riderAssigned: 'تم إسناد السائق',
    onTheWay: 'السائق في الطريق على شارع برکی',
    delivered: 'تم التوصيل ساخناً وطازجاً!',
    liveMapTracking: 'خريطة التوصيل الحية',
    reviewsTitle: 'تقييمات العملاء الموثقة',
    leaveReview: 'شاركنا رأيك وتجربتك',
    submitFeedback: 'إرسال التقييم',
    darkLightMode: 'الوضع الليلي / النهاري',
    privacyPolicy: 'سياسة الخصوصية وأمان البيانات',
    securityAssurance: 'تشفير آمن 256 بت SSL',
    addressLabel: 'سوق لطيف، مقابل بوابة إمبريال جاردن هومز، باراغون سيتي، طريق بركي، لاهور',
    openingHours: 'يومياً: 12 ظهراً إلى 2 صباحاً (عروض منتصف الليل 12:30 إلى 1:30)',
    pizzaPoints: 'نقاط مكافآت البيتزا'
  }
};
