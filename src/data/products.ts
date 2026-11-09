export interface ProductSize {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'pizza' | 'grilled_burger' | 'crispy_burger' | 'sandwich' | 'shawarma_roll' | 'peri_peri' | 'sides_wings' | 'deals' | 'dips_drinks';
  price: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  prepTime?: string;
  sizes?: ProductSize[];
  crustOptions?: string[];
  features?: string[];
}

export const PRODUCTS: Product[] = [
  // ==================== PIZZAS (16 flavours) ====================
  {
    id: 'pizza-chicken-tikka',
    name: 'Chicken Tikka Pizza',
    category: 'pizza',
    price: 520,
    description: 'Traditional charcoal grilled chicken tikka chunks, rich mozzarella, black olives, onions and crispy green capsicum.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.9,
    reviewsCount: 142,
    isPopular: true,
    isSpicy: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-chicken-fajita',
    name: 'Chicken Fajita Pizza',
    category: 'pizza',
    price: 520,
    description: 'Savory Mexican seasoned chicken, premium melted cheese, sliced onion, diced fresh tomato & bell pepper.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 4.8,
    reviewsCount: 98,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-chicken-grilled',
    name: 'Chicken Grilled Pizza',
    category: 'pizza',
    price: 520,
    description: 'Slow-grilled chicken breast cubes, herb tomato sauce, mozzarella cheese, onion and crisp green pepper.',
    image: '/images/products/pizza_pan_golden_supreme.jpg',
    rating: 4.7,
    reviewsCount: 76,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-cheese-lovers',
    name: 'Cheese Lovers Pizza',
    category: 'pizza',
    price: 520,
    description: 'Golden crust flooded with double mozzarella, cheddar blend, and Italian herb infused pizza sauce.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.8,
    reviewsCount: 64,
    isVeg: true,
    prepTime: '15-20 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-chef-recommended',
    name: 'Chef Recommended Pizza',
    category: 'pizza',
    price: 520,
    description: 'Master chef signature mix: juicy chicken, mozzarella, black olives, tomato, beef/chicken sausages, capsicum & button mushrooms.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 5.0,
    reviewsCount: 189,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-hot-spicy',
    name: 'Hot & Spicy Pizza',
    category: 'pizza',
    price: 520,
    description: 'Extra spicy marinated grilled chicken, molten cheese, red onions, tomatoes and fresh fiery bell peppers.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.9,
    reviewsCount: 112,
    isSpicy: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pepperoni Classic Pizza',
    category: 'pizza',
    price: 520,
    description: 'Generous layer of smoky pepperoni slices, rich mozzarella, sliced black olives, crunchy capsicum & onion.',
    image: '/images/products/pizza_pan_golden_supreme.jpg',
    rating: 4.8,
    reviewsCount: 120,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-vegi',
    name: 'Vegi Pizza',
    category: 'pizza',
    price: 520,
    description: 'Farm fresh sweet tomatoes, bell peppers, golden onions, sliced black olives and fresh herbs over melted mozzarella.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.6,
    reviewsCount: 52,
    isVeg: true,
    prepTime: '15-20 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-chicken-supreme',
    name: 'Chicken Supreme Pizza',
    category: 'pizza',
    price: 520,
    description: 'Supreme combo with spiced chicken, cheese, sliced black olives, sweet corn kernels, button mushrooms & capsicum.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 4.9,
    reviewsCount: 154,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 520 },
      { name: 'Medium 10"', price: 970 },
      { name: 'Large 13"', price: 1490 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-malai-boti',
    name: 'Malai Boti Pizza',
    category: 'pizza',
    price: 560,
    description: 'Melt-in-mouth chicken malai boti, onion rings, green capsicum, shredded mozzarella and silky malai cream drizzle.',
    image: '/images/products/pizza_pan_golden_supreme.jpg',
    rating: 4.9,
    reviewsCount: 178,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 560 },
      { name: 'Medium 10"', price: 1020 },
      { name: 'Large 13"', price: 1560 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-creamy',
    name: 'Creamy Pizza Deluxe',
    category: 'pizza',
    price: 560,
    description: 'Soft shredded mozzarella, tender pulled chicken, black olives, sweet onions and luscious garlic cream sauce.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.7,
    reviewsCount: 88,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 560 },
      { name: 'Medium 10"', price: 1020 },
      { name: 'Large 13"', price: 1560 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-peri-peri-lover',
    name: 'Peri Peri Lover Pizza',
    category: 'pizza',
    price: 630,
    description: 'Zesty peri peri marinated chicken chunks, mozzarella, black olives, crisp onions and bell pepper rings.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 4.9,
    reviewsCount: 135,
    isSpicy: true,
    isPopular: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 630 },
      { name: 'Medium 10"', price: 1190 },
      { name: 'Large 13"', price: 1710 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)', 'Kabab Stuffed (+Rs. 200)']
  },
  {
    id: 'pizza-sicilian',
    name: 'Sicilian Pizza',
    category: 'pizza',
    price: 560,
    description: 'Chicken, onion, capsicum, shredded mozzarella, aromatic oregano and sun dried tomato seasoning.',
    image: '/images/products/pizza_pan_golden_supreme.jpg',
    rating: 4.7,
    reviewsCount: 67,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 560 },
      { name: 'Medium 10"', price: 1020 },
      { name: 'Large 13"', price: 1560 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-euro-special',
    name: 'Euro Special Pizza',
    category: 'pizza',
    price: 560,
    description: 'European recipe: diced chicken, shredded mozzarella cheese, black olives, onion, fiery jalapeños and capsicum.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.8,
    reviewsCount: 94,
    isSpicy: true,
    prepTime: '20-25 mins',
    sizes: [
      { name: 'Small 7"', price: 560 },
      { name: 'Medium 10"', price: 1020 },
      { name: 'Large 13"', price: 1560 }
    ],
    crustOptions: ['Deep Pan', 'Thin Pan', 'Cheese Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-the-pizza-shop-special',
    name: 'The Pizza Shop Special',
    category: 'pizza',
    price: 1310,
    description: 'Signature masterpiece! Stuffed crust (Cheese or Kabab), chicken cubes, shredded mozzarella, black olives, onion, green chilli and capsicum.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 5.0,
    reviewsCount: 224,
    isPopular: true,
    isSpicy: true,
    prepTime: '25-30 mins',
    sizes: [
      { name: 'Medium 10"', price: 1310 },
      { name: 'Large 13"', price: 1850 }
    ],
    crustOptions: ['Cheese Stuffed Crust', 'Kabab Stuffed Crust', 'Double Cheese & Kabab Stuffed (+Rs. 150)']
  },
  {
    id: 'pizza-behari-kabab-stuffed',
    name: 'Behari Kabab Stuffed Pizza',
    category: 'pizza',
    price: 1350,
    description: 'Tender spiced behari kabab baked straight into the crust rim, topped with smoky tikka chicken, mozzarella & mint chili sauce.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 4.9,
    reviewsCount: 160,
    isPopular: true,
    isSpicy: true,
    prepTime: '25-30 mins',
    sizes: [
      { name: 'Medium 10"', price: 1350 },
      { name: 'Large 13"', price: 1890 }
    ],
    crustOptions: ['Authentic Behari Kabab Stuffed Crust']
  },

  // ==================== SIZZLING GRILLED BURGERS ====================
  {
    id: 'burger-peri-peri-grilled',
    name: 'Peri Peri Grilled Burger',
    category: 'grilled_burger',
    price: 420,
    description: 'Double flame-grilled chicken patty topped with authentic Peri Peri glaze, melted cheese, crisp lettuce & tomatoes.',
    image: '/images/products/burger_grilled_sizzling.jpg',
    rating: 4.9,
    reviewsCount: 145,
    isPopular: true,
    isSpicy: true,
    prepTime: '15 mins',
    features: ['Double Grilled Patties', 'Topped with Cheese', 'Original Peri Peri Sauce']
  },
  {
    id: 'burger-hot-spicy-grilled',
    name: 'Hot & Spicy Grilled Burger',
    category: 'grilled_burger',
    price: 420,
    description: 'Flame-seared grilled chicken breast smothered in fiery hot & spicy sauce, jalapeño mayo and melted cheddar.',
    image: '/images/products/grilled_patties_flame.jpg',
    rating: 4.8,
    reviewsCount: 92,
    isSpicy: true,
    prepTime: '15 mins',
    features: ['Fiery Marinade', 'Melted Cheddar', 'Double Patties']
  },
  {
    id: 'burger-grilled-bbq',
    name: 'Grilled BBQ Burger',
    category: 'grilled_burger',
    price: 420,
    description: 'Charbroiled chicken with smoky barbecue marinade, caramelized onions, crisp greens and cheese.',
    image: '/images/products/burger_grilled_sizzling.jpg',
    rating: 4.7,
    reviewsCount: 88,
    prepTime: '15 mins',
    features: ['Smoky BBQ Glaze', 'Flame Kissed', 'Topped with Cheese']
  },
  {
    id: 'burger-mushroom-glory',
    name: 'Mushroom Glory Burger',
    category: 'grilled_burger',
    price: 420,
    description: 'Grilled chicken patty topped with rich mushroom herb sauce, garlic butter spread and melted provolone cheese.',
    image: '/images/products/burger_grilled_sizzling.jpg',
    rating: 4.8,
    reviewsCount: 79,
    prepTime: '15 mins',
    features: ['Wild Mushroom Sauce', 'Double Patties', 'Garlic Butter Bun']
  },
  {
    id: 'deal-jumbo-grilled-value',
    name: 'Jumbo Grilled Burger Value Deal',
    category: 'grilled_burger',
    price: 590,
    description: 'Jumbo flame-grilled chicken burger with cheese + golden salted French fries + 350ml chilled soft drink.',
    image: '/images/products/deal_bachelor_bd3.jpg',
    rating: 5.0,
    reviewsCount: 173,
    isPopular: true,
    prepTime: '15-20 mins',
    features: ['Includes Regular Fries', 'Includes Soft Drink 350ml', 'Great Value']
  },
  {
    id: 'burger-double-beef-grilled',
    name: 'Double Beef Flame Grilled Burger',
    category: 'grilled_burger',
    price: 620,
    description: 'Twin seasoned prime beef patties grilled over open flame, double cheese slice, pickles and secret burger relish.',
    image: '/images/products/burger_grilled_sizzling.jpg',
    rating: 4.9,
    reviewsCount: 110,
    isPopular: true,
    prepTime: '18 mins'
  },

  // ==================== CRISPY CRUNCHY BURGERS ====================
  {
    id: 'burger-jumbo-zinger',
    name: 'Jumbo Zinger Burger',
    category: 'crispy_burger',
    price: 420,
    description: 'Super crunchy crispy fried chicken breast fillet, creamy garlic mayo, shredded iceberg lettuce on toasted sesame bun.',
    image: '/images/products/burger_jumbo_zinger_cheese.jpg',
    rating: 5.0,
    reviewsCount: 310,
    isPopular: true,
    prepTime: '12-15 mins',
    features: ['Extra Crunchy Fillet', 'Fresh Sesame Bun', 'Secret Garlic Mayo']
  },
  {
    id: 'burger-fish-zinger',
    name: 'Fish Zinger Burger',
    category: 'crispy_burger',
    price: 700,
    description: 'Crispy batter-fried tender fish fillet with tangy dill tartar sauce, cheese slice and crisp lettuce.',
    image: '/images/products/burger_fish_tempura.jpg',
    rating: 4.7,
    reviewsCount: 65,
    prepTime: '15 mins'
  },
  {
    id: 'burger-classic-chicken',
    name: 'Classic Chicken Burger (Grill/Fry)',
    category: 'crispy_burger',
    price: 320,
    description: 'Golden spiced chicken patty, fresh tomato slices, crunchy cucumber, iceberg lettuce & house dressing.',
    image: '/images/products/burger_chicken_veggie.jpg',
    rating: 4.6,
    reviewsCount: 95,
    prepTime: '12 mins'
  },
  {
    id: 'burger-chicken-cheese',
    name: 'Chicken Cheese Burger (Grill/Fry)',
    category: 'crispy_burger',
    price: 370,
    description: 'Classic chicken burger crowned with melted yellow cheddar cheese slice and creamy signature mayo.',
    image: '/images/products/burger_chicken_veggie.jpg',
    rating: 4.8,
    reviewsCount: 130,
    isPopular: true,
    prepTime: '12 mins'
  },
  {
    id: 'burger-double-decker',
    name: 'Double Decker Burger',
    category: 'crispy_burger',
    price: 610,
    description: 'Double crunchy zinger patties stacked two layers high with special dressing, iceberg lettuce and pickles.',
    image: '/images/products/deal_bachelor_bd7.jpg',
    rating: 4.9,
    reviewsCount: 168,
    isPopular: true,
    prepTime: '15-18 mins'
  },
  {
    id: 'burger-double-decker-cheese',
    name: 'Double Decker with Cheese',
    category: 'crispy_burger',
    price: 660,
    description: 'Double zinger patties loaded with double melted cheese slices, extra sauce and sesame bun.',
    image: '/images/products/deal_bachelor_bd7.jpg',
    rating: 4.9,
    reviewsCount: 142,
    isPopular: true,
    prepTime: '15-18 mins'
  },
  {
    id: 'burger-tower-burger',
    name: 'Tower Burger (Grill/Fry)',
    category: 'crispy_burger',
    price: 550,
    description: 'Towering burger with zinger fillet, tender chicken patty, crispy hash brown potato and creamy cheese.',
    image: '/images/products/burger_jumbo_zinger_cheese.jpg',
    rating: 4.9,
    reviewsCount: 185,
    isPopular: true,
    prepTime: '15-18 mins'
  },
  {
    id: 'burger-tower-cheese',
    name: 'Tower Burger with Extra Cheese',
    category: 'crispy_burger',
    price: 600,
    description: 'Tower burger enriched with double layers of imported cheddar and warm cheese lava sauce.',
    image: '/images/products/burger_jumbo_zinger_cheese.jpg',
    rating: 5.0,
    reviewsCount: 122,
    prepTime: '15-18 mins'
  },
  {
    id: 'burger-jumbo-double-egg',
    name: 'Jumbo Double Egg Burger',
    category: 'crispy_burger',
    price: 210,
    description: 'Twin fried farm eggs with seasoned minced chicken, onion rings, lettuce and tangy ketchup-mayo blend.',
    image: '/images/products/burger_jumbo_double_egg.jpg',
    rating: 4.6,
    reviewsCount: 78,
    prepTime: '10-12 mins'
  },
  {
    id: 'burger-fish-tempura',
    name: 'Fish Tempura Burger',
    category: 'crispy_burger',
    price: 300,
    description: 'Light tempura coated fish fillet with crispy lettuce, tomato and tartar glaze on toasted bun.',
    image: '/images/products/burger_fish_tempura.jpg',
    rating: 4.7,
    reviewsCount: 64,
    prepTime: '12-15 mins'
  },

  // ==================== SANDWICHES ====================
  {
    id: 'sandwich-grilled-chicken',
    name: 'Grilled Chicken Sandwich',
    category: 'sandwich',
    price: 310,
    description: 'Golden grilled sandwich bread filled with spiced shredded chicken breast and garlic mayo.',
    image: '/images/products/sandwich_grilled_chicken.jpg',
    rating: 4.8,
    reviewsCount: 95,
    prepTime: '10-12 mins'
  },
  {
    id: 'sandwich-chicken-fajita',
    name: 'Chicken Fajita Sandwich',
    category: 'sandwich',
    price: 310,
    description: 'Toasted sandwich packed with Mexican fajita chicken, sautéed onions and bell peppers.',
    image: '/images/products/sandwich_grilled_chicken.jpg',
    rating: 4.7,
    reviewsCount: 72,
    prepTime: '10-12 mins'
  },
  {
    id: 'sandwich-chicken-cheese',
    name: 'Chicken Cheese Sandwich',
    category: 'sandwich',
    price: 350,
    description: 'Grilled chicken sandwich pressed with overflowing melted cheddar and mozzarella cheese.',
    image: '/images/products/sandwich_grilled_chicken.jpg',
    rating: 4.9,
    reviewsCount: 114,
    isPopular: true,
    prepTime: '10-12 mins'
  },
  {
    id: 'sandwich-club-deluxe',
    name: 'Club Sandwich Deluxe',
    category: 'sandwich',
    price: 360,
    description: 'Triple decker toasted sandwich with grilled chicken, fried egg, cucumber, tomato, cheese and coleslaw.',
    image: '/images/products/sandwich_club_deluxe.jpg',
    rating: 5.0,
    reviewsCount: 204,
    isPopular: true,
    prepTime: '12-15 mins',
    features: ['Triple Layer Toasted', 'Includes French Fries & Coleslaw']
  },
  {
    id: 'sandwich-smoked-bbq-club',
    name: 'Smoked BBQ Club Sandwich',
    category: 'sandwich',
    price: 400,
    description: 'Triple-decker club sandwich layered with smoky BBQ chicken, egg, cheddar and house BBQ dip.',
    image: '/images/products/sandwich_club_deluxe.jpg',
    rating: 4.8,
    reviewsCount: 88,
    prepTime: '12-15 mins'
  },

  // ==================== SHAWARMA, TWISTERS & ROLLS ====================
  {
    id: 'shawarma-arabian-chicken',
    name: 'Arabian Shawarma Chicken',
    category: 'shawarma_roll',
    price: 320,
    description: 'Authentic Middle Eastern spiced roasted chicken shavings, garlic toum, french fries & pickles in fresh pita bread.',
    image: '/images/products/shawarma_arabian_wrap.jpg',
    rating: 4.9,
    reviewsCount: 240,
    isPopular: true,
    prepTime: '10 mins'
  },
  {
    id: 'shawarma-chicken-cheese',
    name: 'Arabian Shawarma Chicken Cheese',
    category: 'shawarma_roll',
    price: 370,
    description: 'Arabian chicken shawarma rolled with generous molten mozzarella and garlic aioli.',
    image: '/images/products/shawarma_arabian_wrap.jpg',
    rating: 4.9,
    reviewsCount: 195,
    isPopular: true,
    prepTime: '10 mins'
  },
  {
    id: 'shawarma-platter-special',
    name: 'Shawarma Platter Deluxe',
    category: 'shawarma_roll',
    price: 600,
    description: 'Open plate presentation: sliced roasted shawarma chicken, warm pita triangles, french fries, hummus & pickled veggies.',
    image: '/images/products/shawarma_arabian_wrap.jpg',
    rating: 5.0,
    reviewsCount: 180,
    isPopular: true,
    prepTime: '15 mins'
  },
  {
    id: 'twister-chicken-pita',
    name: 'Chicken Twister (Pita/Paratha)',
    category: 'shawarma_roll',
    price: 420,
    description: 'Tender crunchy chicken strips wrapped with fresh lettuce, diced tomato & pepper mayo in choice of pita or flaky paratha.',
    image: '/images/products/twister_pita_chicken.jpg',
    rating: 4.8,
    reviewsCount: 140,
    isPopular: true,
    prepTime: '12 mins'
  },
  {
    id: 'twister-fish-pita',
    name: 'Fish Twister (Pita/Paratha)',
    category: 'shawarma_roll',
    price: 700,
    description: 'Golden fried fish fillet strips wrapped with tartar dressing, shredded lettuce and herbs in warm flatbread.',
    image: '/images/products/twister_pita_chicken.jpg',
    rating: 4.6,
    reviewsCount: 50,
    prepTime: '15 mins'
  },
  {
    id: 'roll-tikka-paratha',
    name: 'Tikka Paratha Roll',
    category: 'shawarma_roll',
    price: 330,
    description: 'Charcoal grilled chicken tikka boti wrapped in hot crispy paratha with mint yogurt chutney & sliced onions.',
    image: '/images/products/paratha_roll_special.jpg',
    rating: 4.9,
    reviewsCount: 220,
    isPopular: true,
    isSpicy: true,
    prepTime: '10 mins'
  },
  {
    id: 'roll-malai-boti-paratha',
    name: 'Malai Boti Paratha Roll',
    category: 'shawarma_roll',
    price: 330,
    description: 'Creamy charcoal malai chicken cubes, sweet & sour chutney, fresh onions rolled inside flaky paratha.',
    image: '/images/products/paratha_roll_special.jpg',
    rating: 4.9,
    reviewsCount: 198,
    isPopular: true,
    prepTime: '10 mins'
  },
  {
    id: 'roll-kabab-paratha',
    name: 'Kabab Paratha Roll',
    category: 'shawarma_roll',
    price: 330,
    description: 'Spiced beef/chicken seekh kabab grilled on charcoal, rolled in butter paratha with kachumber salad.',
    image: '/images/products/paratha_roll_special.jpg',
    rating: 4.8,
    reviewsCount: 135,
    prepTime: '10 mins'
  },
  {
    id: 'roll-behari-boti-paratha',
    name: 'Behari Boti Paratha Roll',
    category: 'shawarma_roll',
    price: 330,
    description: 'Tender marinated behari meat boti with roasted mustard oil aroma, green chilies and paratha wrap.',
    image: '/images/products/paratha_roll_special.jpg',
    rating: 4.8,
    reviewsCount: 110,
    isSpicy: true,
    prepTime: '10 mins'
  },
  {
    id: 'donner-chicken-kebab',
    name: 'Chicken Donner Kebab',
    category: 'shawarma_roll',
    price: 600,
    description: 'Turkish style fresh toasted pocket bun stuffed with carved grilled chicken, cabbage, garlic mayo and red chili sauce.',
    image: '/images/products/chicken_donner_kebab.jpg',
    rating: 4.8,
    reviewsCount: 89,
    prepTime: '12 mins'
  },
  {
    id: 'donner-chicken-cheese',
    name: 'Chicken Donner with Cheese',
    category: 'shawarma_roll',
    price: 650,
    description: 'Turkish chicken donner smothered with melted mozzarella cheese and herb garlic sauce.',
    image: '/images/products/chicken_donner_kebab.jpg',
    rating: 4.9,
    reviewsCount: 104,
    isPopular: true,
    prepTime: '12 mins'
  },

  // ==================== PERI PERI & CHARCOAL GRILLED CHICKEN ====================
  {
    id: 'peri-peri-grilled-chicken-full',
    name: 'Original Peri Peri Grilled Chicken (Full)',
    category: 'peri_peri',
    price: 1560,
    description: 'Whole succulent chicken marinated for 24h in bird’s eye chili peri peri sauce, slow-grilled over charcoal. Served with peri peri dip & 4 pcs garlic bread.',
    image: '/images/products/chicken_peri_peri_grilled_whole.jpg',
    rating: 5.0,
    reviewsCount: 260,
    isPopular: true,
    isSpicy: true,
    prepTime: '25-30 mins',
    features: ['Includes Peri Peri Dip', 'Includes 4pcs Garlic Bread', 'Charcoal Grilled']
  },
  {
    id: 'peri-peri-grilled-chicken-half',
    name: 'Original Peri Peri Grilled Chicken (Half)',
    category: 'peri_peri',
    price: 830,
    description: 'Half succulent grilled chicken with signature peri peri sauce. Served with peri peri dip & 2 pcs garlic bread.',
    image: '/images/products/chicken_peri_peri_grilled_whole.jpg',
    rating: 4.9,
    reviewsCount: 180,
    isPopular: true,
    isSpicy: true,
    prepTime: '20-25 mins',
    features: ['Includes Peri Peri Dip', 'Includes 2pcs Garlic Bread']
  },
  {
    id: 'lahori-grilled-chicken-full',
    name: 'Lahori Grilled Chicken (Full)',
    category: 'peri_peri',
    price: 1460,
    description: 'Traditional Lahori herb & tandoori spiced whole chicken roasted over coals. Served with mint raita, fresh salad & 2 pcs hot tandoori naan.',
    image: '/images/products/chicken_peri_peri_grilled_whole.jpg',
    rating: 4.9,
    reviewsCount: 215,
    isPopular: true,
    prepTime: '25-30 mins',
    features: ['Includes Mint Raita & Salad', 'Includes 2pcs Tandoori Naan']
  },
  {
    id: 'lahori-grilled-chicken-half',
    name: 'Lahori Grilled Chicken (Half)',
    category: 'peri_peri',
    price: 730,
    description: 'Half Lahori charcoal roasted chicken served with cooling mint raita, fresh salad & 1 pc hot tandoori naan.',
    image: '/images/products/chicken_peri_peri_grilled_whole.jpg',
    rating: 4.8,
    reviewsCount: 140,
    prepTime: '20-25 mins',
    features: ['Includes Mint Raita & Salad', 'Includes 1pc Tandoori Naan']
  },
  {
    id: 'peri-peri-wings-8pcs',
    name: 'Peri Peri Wings (8 Pieces)',
    category: 'peri_peri',
    price: 600,
    description: '8 juicy flame-grilled chicken wings basted in spicy lemon-herb peri peri glaze.',
    image: '/images/products/hot_chicken_wings_basket.jpg',
    rating: 4.8,
    reviewsCount: 165,
    isSpicy: true,
    isPopular: true,
    prepTime: '15 mins'
  },

  // ==================== SIDES, WINGS & FRIES ====================
  {
    id: 'side-crispy-chicken-1pc',
    name: 'Crispy Fried Chicken (1 Piece)',
    category: 'sides_wings',
    price: 220,
    description: 'Crispy golden batter fried chicken piece, tender and juicy inside (choice of Breast, Thigh, or Drumstick).',
    image: '/images/products/fried_crispy_chicken_piece.jpg',
    rating: 4.8,
    reviewsCount: 175,
    prepTime: '10-12 mins'
  },
  {
    id: 'side-crispy-chicken-3pcs',
    name: 'Crispy Chicken Box (3 Pieces)',
    category: 'sides_wings',
    price: 590,
    description: '3 golden crispy fried chicken pieces served with bun and garlic mayo.',
    image: '/images/products/fried_crispy_chicken_piece.jpg',
    rating: 4.9,
    reviewsCount: 140,
    isPopular: true,
    prepTime: '15 mins'
  },
  {
    id: 'side-hot-chicken-wings-8pcs',
    name: 'Hot Chicken Wings (8 Pieces)',
    category: 'sides_wings',
    price: 470,
    description: '8 pieces of crispy fried or grilled wings tossed in signature hot chili seasoning.',
    image: '/images/products/hot_chicken_wings_basket.jpg',
    rating: 4.9,
    reviewsCount: 230,
    isPopular: true,
    isSpicy: true,
    prepTime: '12-15 mins'
  },
  {
    id: 'side-french-fries-plain',
    name: 'French Fries (Plain Salted)',
    category: 'sides_wings',
    price: 200,
    description: 'Crispy golden potato fries lightly salted, fried to perfection.',
    image: '/images/products/french_fries_crispy.jpg',
    rating: 4.7,
    reviewsCount: 180,
    prepTime: '8-10 mins',
    sizes: [
      { name: 'Regular 150g', price: 200 },
      { name: 'Large 250g', price: 270 }
    ]
  },
  {
    id: 'side-french-fries-cheese',
    name: 'Cheese French Fries',
    category: 'sides_wings',
    price: 270,
    description: 'Hot crispy fries smothered in melted cheddar cheese lava sauce.',
    image: '/images/products/french_fries_crispy.jpg',
    rating: 4.9,
    reviewsCount: 195,
    isPopular: true,
    prepTime: '8-10 mins',
    sizes: [
      { name: 'Regular', price: 270 },
      { name: 'Large', price: 320 }
    ]
  },
  {
    id: 'side-french-fries-mayo-garlic',
    name: 'Mayo Garlic French Fries',
    category: 'sides_wings',
    price: 270,
    description: 'French fries drizzled with house garlic mayonnaise and cracked pepper.',
    image: '/images/products/french_fries_crispy.jpg',
    rating: 4.8,
    reviewsCount: 160,
    prepTime: '8-10 mins',
    sizes: [
      { name: 'Regular', price: 270 },
      { name: 'Large', price: 320 }
    ]
  },
  {
    id: 'side-french-fries-bbq',
    name: 'Smoky BBQ French Fries',
    category: 'sides_wings',
    price: 270,
    description: 'Seasoned with hickory barbecue glaze and aromatic spices.',
    image: '/images/products/french_fries_crispy.jpg',
    rating: 4.7,
    reviewsCount: 110,
    prepTime: '8-10 mins',
    sizes: [
      { name: 'Regular', price: 270 },
      { name: 'Large', price: 320 }
    ]
  },
  {
    id: 'side-chicken-nuggets-6pcs',
    name: 'Chicken Nuggets (6 Pieces)',
    category: 'sides_wings',
    price: 340,
    description: '6 pieces of golden crunchy chicken nuggets with dip sauce.',
    image: '/images/products/crispy_chicken_nuggets.jpg',
    rating: 4.8,
    reviewsCount: 145,
    prepTime: '8 mins'
  },
  {
    id: 'side-chicken-nuggets-12pcs',
    name: 'Chicken Nuggets (12 Pieces)',
    category: 'sides_wings',
    price: 590,
    description: 'Party pack of 12 crispy chicken nuggets with choice of two dips.',
    image: '/images/products/crispy_chicken_nuggets.jpg',
    rating: 4.9,
    reviewsCount: 120,
    prepTime: '10 mins'
  },
  {
    id: 'side-chicken-n-chips',
    name: 'Chicken \'N Chips Combo',
    category: 'sides_wings',
    price: 600,
    description: 'Crispy boneless chicken tenderloins served with golden French fries and garlic dip.',
    image: '/images/products/chicken_and_chips_combo.jpg',
    rating: 4.9,
    reviewsCount: 190,
    isPopular: true,
    prepTime: '12-15 mins'
  },
  {
    id: 'side-fish-n-chips',
    name: 'Fish \'N Chips Basket',
    category: 'sides_wings',
    price: 900,
    description: 'Crispy finger fish fillets coated in seasoned batter, served with french fries and tartar sauce.',
    image: '/images/products/fish_and_chips_crispy.jpg',
    rating: 4.8,
    reviewsCount: 130,
    isPopular: true,
    prepTime: '15 mins'
  },
  {
    id: 'side-fruit-salad',
    name: 'Fresh Fruit Salad Bowl',
    category: 'sides_wings',
    price: 220,
    description: 'Chilled seasonal fruit slices tossed in fresh sweet cream dressing and dry fruits.',
    image: '/images/products/salad_fresh_fruit_bowl.jpg',
    rating: 4.7,
    reviewsCount: 65,
    isVeg: true,
    prepTime: '5 mins',
    sizes: [
      { name: 'Regular Bowl', price: 220 },
      { name: 'Large Bowl', price: 320 }
    ]
  },

  // ==================== BACHELOR DEALS (COMBOS) ====================
  {
    id: 'deal-bd-1',
    name: 'Bachelor Deal BD#1',
    category: 'deals',
    price: 500,
    description: '1 Chicken Burger (Grill/Fry) + Regular Fries 150g + Chilled Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd1.jpg',
    rating: 4.9,
    reviewsCount: 280,
    isPopular: true,
    prepTime: '12-15 mins',
    features: ['1 Chicken Burger', 'Regular Fries', '500ml Cold Drink']
  },
  {
    id: 'deal-bd-2',
    name: 'Bachelor Deal BD#2',
    category: 'deals',
    price: 490,
    description: '1 Arabian Chicken Shawarma + Regular Fries 150g + Chilled Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd2.jpg',
    rating: 4.9,
    reviewsCount: 260,
    isPopular: true,
    prepTime: '10-12 mins',
    features: ['1 Chicken Shawarma', 'Regular Fries', '500ml Cold Drink']
  },
  {
    id: 'deal-bd-3',
    name: 'Bachelor Deal BD#3',
    category: 'deals',
    price: 590,
    description: '1 Jumbo Zinger Burger or Grill Burger + Regular Fries 150g + Chilled Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd3.jpg',
    rating: 5.0,
    reviewsCount: 340,
    isPopular: true,
    prepTime: '12-15 mins',
    features: ['1 Jumbo Zinger Burger', 'Regular Fries', '500ml Cold Drink']
  },
  {
    id: 'deal-bd-4',
    name: 'Bachelor Deal BD#4',
    category: 'deals',
    price: 790,
    description: '1 Jumbo Zinger Burger + 1 Crispy Fried Chicken Piece + Regular Fries 150g + Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd4.jpg',
    rating: 5.0,
    reviewsCount: 310,
    isPopular: true,
    prepTime: '15 mins',
    features: ['1 Zinger Burger', '1 Crispy Chicken Piece', 'Regular Fries', '500ml Cold Drink']
  },
  {
    id: 'deal-bd-5',
    name: 'Bachelor Deal BD#5',
    category: 'deals',
    price: 790,
    description: '1 Small Pizza 7" (Any Regular Flavor) + 4 Hot Chicken Wings + Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd5.jpg',
    rating: 4.9,
    reviewsCount: 220,
    isPopular: true,
    prepTime: '20 mins',
    features: ['Small Pizza 7"', '4 Hot Wings', '500ml Soft Drink']
  },
  {
    id: 'deal-bd-6',
    name: 'Bachelor Deal BD#6',
    category: 'deals',
    price: 1360,
    description: '1 Medium Pizza 10" (Any Regular Flavor) + 6 Hot Chicken Wings + Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd6.jpg',
    rating: 5.0,
    reviewsCount: 245,
    isPopular: true,
    prepTime: '20-25 mins',
    features: ['Medium Pizza 10"', '6 Hot Wings', '500ml Soft Drink']
  },
  {
    id: 'deal-bd-7',
    name: 'Bachelor Deal BD#7',
    category: 'deals',
    price: 760,
    description: '1 Double Decker Burger (Grill/Fry) + Regular Fries 150g + Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd7.jpg',
    rating: 4.8,
    reviewsCount: 190,
    prepTime: '15 mins',
    features: ['Double Decker Burger', 'Regular Fries', '500ml Cold Drink']
  },
  {
    id: 'deal-bd-8',
    name: 'Bachelor Deal BD#8',
    category: 'deals',
    price: 850,
    description: '2 Jumbo Zinger Burgers + Chilled Soft Drink 500ml.',
    image: '/images/products/deal_bachelor_bd8.jpg',
    rating: 4.9,
    reviewsCount: 275,
    isPopular: true,
    prepTime: '15 mins',
    features: ['2 Jumbo Zinger Burgers', '500ml Cold Drink']
  },

  // ==================== 10 COMPLETE FAMILY MEGA DEALS ====================
  {
    id: 'deal-fd-1',
    name: 'Family Mega Deal FD#1',
    category: 'deals',
    price: 2040,
    description: '1 Large Pizza 13" (Any Regular Flavor) + 8 Hot Chicken Wings (Grill/Fry) + Soft Drink 1.5 Litre. Perfect for 3-4 persons.',
    image: '/images/products/deal_family_fd1.jpg',
    rating: 5.0,
    reviewsCount: 390,
    isPopular: true,
    prepTime: '25-30 mins',
    features: ['1 Large Pizza 13"', '8 Hot Wings', '1.5L Soft Drink', 'Serves 3-4 Persons']
  },
  {
    id: 'deal-fd-2',
    name: 'Family Mega Deal FD#2',
    category: 'deals',
    price: 2370,
    description: '4 Jumbo Zinger Burgers (Grill/Fry) + 4 Regular Fries + Soft Drink 1.5 Litre. Crispy burger lovers feast.',
    image: '/images/products/deal_family_fd2.jpg',
    rating: 5.0,
    reviewsCount: 360,
    isPopular: true,
    prepTime: '20-25 mins',
    features: ['4 Jumbo Zinger Burgers', '4 Regular Fries', '1.5L Soft Drink', 'Serves 4 Persons']
  },
  {
    id: 'deal-fd-3',
    name: 'Family Mega Deal FD#3',
    category: 'deals',
    price: 2550,
    description: '1 Large Pizza 13" + 1 Medium Pizza 10" (Any Regular Flavors) + Soft Drink 1.5 Litre. Double pizza happiness.',
    image: '/images/products/deal_family_fd3.jpg',
    rating: 5.0,
    reviewsCount: 410,
    isPopular: true,
    prepTime: '25-30 mins',
    features: ['1 Large Pizza 13"', '1 Medium Pizza 10"', '1.5L Soft Drink', 'Serves 4-5 Persons']
  },
  {
    id: 'deal-fd-4',
    name: 'Family Feast Deal FD#4',
    category: 'deals',
    price: 3150,
    description: '1 Large Pizza 13" + 2 Jumbo Zinger Burgers + 8 Hot Chicken Wings + 2 Regular Fries + Soft Drink 2.25 Litre.',
    image: '/images/products/deal_family_fd4.jpg',
    rating: 5.0,
    reviewsCount: 450,
    isPopular: true,
    prepTime: '25-30 mins',
    features: ['1 Large Pizza 13"', '2 Zinger Burgers', '8 Wings', '2 Fries', '2.25L Drink', 'Serves 5-6 Persons']
  },
  {
    id: 'deal-fd-5',
    name: 'Family Grand Feast FD#5',
    category: 'deals',
    price: 3490,
    description: '2 Large Pizzas 13" (Any Regular Flavors) + 8 Hot Chicken Wings + Soft Drink 1.5 Litre. Grand weekend celebration.',
    image: '/images/products/deal_family_fd5.jpg',
    rating: 5.0,
    reviewsCount: 380,
    isPopular: true,
    prepTime: '25-30 mins',
    features: ['2 Large Pizzas 13"', '8 Hot Wings', '1.5L Soft Drink', 'Serves 6-7 Persons']
  },
  {
    id: 'deal-fd-6',
    name: 'Royal Paragon Family Banquet FD#6',
    category: 'deals',
    price: 4890,
    description: '2 Large Pizzas 13" + 4 Jumbo Zinger Burgers + 8 Hot Chicken Wings + 4 French Fries + 2x 1.5L Chilled Soft Drinks.',
    image: '/images/products/deal_family_fd4.jpg',
    rating: 5.0,
    reviewsCount: 290,
    isPopular: true,
    prepTime: '30-35 mins',
    features: ['2 Large Pizzas 13"', '4 Jumbo Zingers', '8 Wings', '4 Fries', '2x 1.5L Drinks', 'Serves 8-10 Persons']
  },
  {
    id: 'deal-fd-7',
    name: 'Charcoal BBQ & Roast Platter FD#7',
    category: 'deals',
    price: 3650,
    description: '1 Whole Original Peri Peri Grilled Chicken + 1 Whole Lahori Charcoal Chicken + 4 Tandoori Naan + Large French Fries + 1.5L Drink + Raita & Garlic Dips.',
    image: '/images/products/chicken_peri_peri_grilled_whole.jpg',
    rating: 4.9,
    reviewsCount: 245,
    isPopular: true,
    prepTime: '30-35 mins',
    features: ['2 Whole Chickens (Peri Peri & Lahori)', '4 Naan & Dips', 'Large Fries', '1.5L Drink', 'Serves 6-8 Persons']
  },
  {
    id: 'deal-fd-8',
    name: 'Stuffed Crust Extravaganza FD#8',
    category: 'deals',
    price: 4250,
    description: '2 Large 13" Cheese & Kabab Stuffed Crust Pizzas + 12 Hot Chicken Wings + 4 Flavour Bomb Signature Dips + 2.25L Soft Drink.',
    image: '/images/products/deal_family_fd5.jpg',
    rating: 5.0,
    reviewsCount: 315,
    isPopular: true,
    prepTime: '30 mins',
    features: ['2 Stuffed Crust Pizzas 13"', '12 Hot Wings', '4 Flavour Dips', '2.25L Drink', 'Serves 6-8 Persons']
  },
  {
    id: 'deal-fd-9',
    name: 'Kids & Family Delight Package FD#9',
    category: 'deals',
    price: 3380,
    description: '1 Large Pizza 13" + 2 Chicken Cheese Burgers + 12 Golden Crispy Nuggets + 2 Large Fries + 4 Dips + 1.5L Chilled Soft Drink.',
    image: '/images/products/deal_family_fd1.jpg',
    rating: 4.9,
    reviewsCount: 210,
    prepTime: '25-30 mins',
    features: ['1 Large Pizza 13"', '2 Cheese Burgers', '12 Nuggets', '2 Large Fries', '1.5L Drink', 'Serves 5-6 Persons']
  },
  {
    id: 'deal-fd-10',
    name: 'Ultimate Mega Sultan Party Feast FD#10',
    category: 'deals',
    price: 7490,
    description: '3 Large Pizzas 13" + 6 Jumbo Zinger Burgers + 16 Hot Chicken Wings + 4 Large Loaded Cheese Fries + 2x 2.25L Jumbo Soft Drinks.',
    image: '/images/products/deal_family_fd4.jpg',
    rating: 5.0,
    reviewsCount: 420,
    isPopular: true,
    prepTime: '35-40 mins',
    features: ['3 Large Pizzas 13"', '6 Jumbo Zingers', '16 Wings', '4 Large Loaded Fries', '2x 2.25L Drinks', 'Serves 12-15 Persons']
  },

  // ==================== MIDNIGHT SPECIAL DEALS (12:30 AM - 1:30 AM) ====================
  {
    id: 'deal-midnight-1',
    name: 'Midnight Deal MD#1 (12:30 - 1:30 AM)',
    category: 'deals',
    price: 1030,
    description: '2 Small Pizzas 7" + 500ml Chilled Drink. Exclusive late-night oven fresh special.',
    image: '/images/products/pizza_pan_golden_supreme.jpg',
    rating: 4.8,
    reviewsCount: 165,
    prepTime: '20 mins',
    features: ['2 Small Pizzas', '500ml Drink', 'Midnight Hours Only']
  },
  {
    id: 'deal-midnight-2',
    name: 'Midnight Deal MD#2 (12:30 - 1:30 AM)',
    category: 'deals',
    price: 1940,
    description: '2 Medium Pizzas 10" + 1.5L Chilled Drink. Hot out of the brick oven.',
    image: '/images/products/pizza_signature_oven.jpg',
    rating: 4.9,
    reviewsCount: 180,
    prepTime: '25 mins',
    features: ['2 Medium Pizzas 10"', '1.5L Drink', 'Midnight Hours Only']
  },
  {
    id: 'deal-midnight-3',
    name: 'Midnight Deal MD#3 (12:30 - 1:30 AM)',
    category: 'deals',
    price: 2970,
    description: '2 Large Pizzas 13" + 1.5L Chilled Drink. Maximum feast for nocturnal pizza lovers.',
    image: '/images/products/pizza_fresh_dough_board.jpg',
    rating: 5.0,
    reviewsCount: 210,
    isPopular: true,
    prepTime: '25 mins',
    features: ['2 Large Pizzas 13"', '1.5L Drink', 'Midnight Hours Only']
  },

  // ==================== DIPS & BEVERAGES ====================
  {
    id: 'dip-ranch-sauce',
    name: 'Flavour Bomb: Ranch Sauce Dip',
    category: 'dips_drinks',
    price: 90,
    description: 'Cool and creamy buttermilk herb ranch dip, perfectly paired with crusts & wings.',
    image: '/images/products/dips_flavour_bomb.jpg',
    rating: 4.9,
    reviewsCount: 310,
    isPopular: true
  },
  {
    id: 'dip-peri-peri-sauce',
    name: 'Flavour Bomb: Peri Peri Sauce Dip',
    category: 'dips_drinks',
    price: 90,
    description: 'Zesty Portuguese style African bird\'s eye chili dip with lemon and garlic notes.',
    image: '/images/products/dips_flavour_bomb.jpg',
    rating: 4.9,
    reviewsCount: 290,
    isSpicy: true,
    isPopular: true
  },
  {
    id: 'dip-hot-chilli-sauce',
    name: 'Flavour Bomb: Hot Chilli Dip',
    category: 'dips_drinks',
    price: 90,
    description: 'Intense red pepper hot chili sauce for true spice enthusiasts.',
    image: '/images/products/dips_flavour_bomb.jpg',
    rating: 4.8,
    reviewsCount: 170,
    isSpicy: true
  },
  {
    id: 'dip-mayo-garlic',
    name: 'Flavour Bomb: Mayo Garlic Dip',
    category: 'dips_drinks',
    price: 90,
    description: 'Smooth roasted garlic emulsion blended with creamy egg mayo.',
    image: '/images/products/dips_flavour_bomb.jpg',
    rating: 4.9,
    reviewsCount: 340,
    isPopular: true
  },
  {
    id: 'dip-bbq-sauce',
    name: 'Flavour Bomb: Hickory BBQ Dip',
    category: 'dips_drinks',
    price: 90,
    description: 'Sweet, tangy and smoky woodfire barbecue dipping sauce.',
    image: '/images/products/dips_flavour_bomb.jpg',
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: 'drink-coke-500ml',
    name: 'Coca-Cola (500ml Bottle)',
    category: 'dips_drinks',
    price: 120,
    description: 'Ice cold refreshing Coca-Cola pet bottle.',
    image: '/images/products/deal_bachelor_bd1.jpg',
    rating: 4.9,
    reviewsCount: 520
  },
  {
    id: 'drink-sprite-500ml',
    name: 'Sprite (500ml Bottle)',
    category: 'dips_drinks',
    price: 120,
    description: 'Crisp lemon-lime flavored carbonated soft drink.',
    image: '/images/products/deal_bachelor_bd2.jpg',
    rating: 4.8,
    reviewsCount: 410
  },
  {
    id: 'drink-fanta-500ml',
    name: 'Fanta Orange (500ml Bottle)',
    category: 'dips_drinks',
    price: 120,
    description: 'Bright citrus orange fizzy soft drink.',
    image: '/images/products/deal_bachelor_bd3.jpg',
    rating: 4.8,
    reviewsCount: 230
  },
  {
    id: 'drink-coke-1-5l',
    name: 'Coca-Cola (1.5 Litre Bottle)',
    category: 'dips_drinks',
    price: 220,
    description: 'Family size 1.5 litre Coca-Cola bottle.',
    image: '/images/products/deal_family_fd1.jpg',
    rating: 4.9,
    reviewsCount: 460
  },
  {
    id: 'drink-sprite-1-5l',
    name: 'Sprite (1.5 Litre Bottle)',
    category: 'dips_drinks',
    price: 220,
    description: 'Family size 1.5 litre Sprite bottle.',
    image: '/images/products/deal_family_fd3.jpg',
    rating: 4.9,
    reviewsCount: 320
  },
  {
    id: 'drink-mineral-water-500ml',
    name: 'Pure Mineral Water (500ml)',
    category: 'dips_drinks',
    price: 70,
    description: 'Chilled premium mineral drinking water.',
    image: '/images/products/salad_fresh_fruit_bowl.jpg',
    rating: 4.9,
    reviewsCount: 150
  },
  {
    id: 'drink-mint-margarita',
    name: 'Fresh Mint Margarita Cooler',
    category: 'dips_drinks',
    price: 290,
    description: 'Blended fresh mint leaves, lemon juice, black salt and chilled soda.',
    image: '/images/products/salad_fresh_fruit_bowl.jpg',
    rating: 4.9,
    reviewsCount: 210,
    isPopular: true
  },
  {
    id: 'dessert-choco-lava',
    name: 'Molten Chocolate Lava Cake',
    category: 'dips_drinks',
    price: 390,
    description: 'Warm chocolate cake with molten chocolate center, served warm.',
    image: '/images/products/salad_fresh_fruit_bowl.jpg',
    rating: 5.0,
    reviewsCount: 180,
    isPopular: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'pizza', label: 'Pizzas', icon: 'Pizza' },
  { id: 'deals', label: 'Value & Family Deals', icon: 'Flame' },
  { id: 'grilled_burger', label: 'Grilled Burgers', icon: 'Flame' },
  { id: 'crispy_burger', label: 'Crispy Burgers', icon: 'Utensils' },
  { id: 'sandwich', label: 'Sandwiches', icon: 'Layers' },
  { id: 'shawarma_roll', label: 'Shawarma & Rolls', icon: 'Wrap' },
  { id: 'peri_peri', label: 'Peri Peri Chicken', icon: 'Drumstick' },
  { id: 'sides_wings', label: 'Sides & Wings', icon: 'Coffee' },
  { id: 'dips_drinks', label: 'Dips & Drinks', icon: 'Wine' }
];

export const STORE_INFO = {
  name: 'The Pizza Shop',
  tagline: 'Changing Fast Food For Good · Super Duper Menu',
  address: 'Latif Market, Opp. Gate Imperial Garden Homes, Paragon City, Barki Road, Lahore',
  phoneLandline: '042 37167082',
  phoneMobile1: '0301 8408177',
  phoneMobile2: '0342 8308177',
  whatsapp: '+923018408177',
  email: 'thepizzashop77@gmail.com',
  facebook: 'facebook.com/thepizzashop.lahore',
  googleMapsUrl: 'https://maps.app.goo.gl/6HvnrNafVxFkivZ58',
  deliveryTime: '35 to 45 mins',
  minOrder: 350,
  freeDeliveryThreshold: 1200,
  deliveryFee: 100,
  rating: 4.8,
  totalReviews: 864,
  lat: 31.5234,
  lng: 74.4621
};
