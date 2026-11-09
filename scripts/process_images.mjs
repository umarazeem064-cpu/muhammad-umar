import { Jimp } from "jimp";
import fs from "fs";
import path from "path";

const outDir = path.resolve("public/images/products");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to crop and place on pure white background
async function cropToWhiteJpg(srcFile, x, y, w, h, destName, targetW = 400, targetH = 400) {
  try {
    const src = await Jimp.read(srcFile);
    const cropped = src.clone().crop({ x, y, w, h });
    
    // Create new white image
    const bg = new Jimp({ width: targetW, height: targetH, color: 0xffffffff });
    
    // Scale cropped image to fit within target
    cropped.scaleToFit({ w: targetW - 40, h: targetH - 40 });
    
    // Center it on the white background
    const posX = Math.floor((targetW - cropped.bitmap.width) / 2);
    const posY = Math.floor((targetH - cropped.bitmap.height) / 2);
    
    bg.composite(cropped, posX, posY);
    
    const destPath = path.join(outDir, `${destName}.jpg`);
    await bg.write(destPath);
    console.log(`Saved: ${destName}.jpg`);
    return destPath;
  } catch (err) {
    console.error(`Failed to crop ${destName}:`, err.message);
  }
}

async function run() {
  console.log("Starting image cropping & JPG generation...");

  // 1. Full Top-Down Pizza
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180731_9133747c.png",
    30, 20, 590, 590,
    "pizza_signature_oven", 500, 500
  );

  // 2. Pizza on board from high-res spread
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    275, 120, 400, 400,
    "pizza_fresh_dough_board", 500, 500
  );

  // 3. Sizzling Grilled Burger
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    700, 30, 240, 200,
    "burger_grilled_sizzling", 450, 450
  );

  // 4. Grilled Chicken Patties on Flame
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    660, 280, 260, 160,
    "grilled_patties_flame", 450, 450
  );

  // 5. Whole Roasted Peri Peri Chicken on wooden board
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1280, 170, 340, 220,
    "chicken_peri_peri_grilled_whole", 500, 500
  );

  // 6. Crispy Cheesy Zinger Burger
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1640, 300, 250, 210,
    "burger_jumbo_zinger_cheese", 450, 450
  );

  // 7. Crispy Fried Chicken Piece
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    750, 715, 130, 120,
    "fried_crispy_chicken_piece", 400, 400
  );

  // 8. Hot Chicken Wings
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    880, 715, 130, 120,
    "hot_chicken_wings_basket", 400, 400
  );

  // 9. French Fries
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1150, 680, 120, 125,
    "french_fries_crispy", 400, 400
  );

  // 10. Golden Nuggets
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    740, 880, 140, 100,
    "crispy_chicken_nuggets", 400, 400
  );

  // 11. Chicken 'N Chips
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    895, 875, 120, 105,
    "chicken_and_chips_combo", 400, 400
  );

  // 12. Fish 'N Chips
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1145, 875, 120, 105,
    "fish_and_chips_crispy", 400, 400
  );

  // 13. Arabian Shawarma
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1425, 680, 160, 150,
    "shawarma_arabian_wrap", 450, 450
  );

  // 14. Twister Roll
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1730, 680, 145, 150,
    "twister_pita_chicken", 450, 450
  );

  // 15. Paratha Roll
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1430, 840, 150, 145,
    "paratha_roll_special", 450, 450
  );

  // 16. Chicken Donner
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180459_c73437df.png",
    1735, 850, 145, 140,
    "chicken_donner_kebab", 450, 450
  );

  // 17. Grilled Chicken Sandwich
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180518_08a2c1ee.png",
    250, 300, 185, 100,
    "sandwich_grilled_chicken", 400, 400
  );

  // 18. Club Sandwich
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180518_08a2c1ee.png",
    250, 395, 185, 105,
    "sandwich_club_deluxe", 400, 400
  );

  // 19. Chicken Veggie Burger
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180518_08a2c1ee.png",
    260, 500, 175, 115,
    "burger_chicken_veggie", 400, 400
  );

  // 20. Jumbo Double Egg Burger
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180518_08a2c1ee.png",
    245, 615, 190, 120,
    "burger_jumbo_double_egg", 400, 400
  );

  // 21. Fish Tempura Burger
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180518_08a2c1ee.png",
    255, 735, 180, 120,
    "burger_fish_tempura", 400, 400
  );

  // 22. Bachelor Deal BD#1
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    65, 205, 140, 135,
    "deal_bachelor_bd1", 450, 450
  );

  // 23. Bachelor Deal BD#2
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    375, 205, 140, 135,
    "deal_bachelor_bd2", 450, 450
  );

  // 24. Bachelor Deal BD#3
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    65, 380, 150, 140,
    "deal_bachelor_bd3", 450, 450
  );

  // 25. Bachelor Deal BD#4
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    360, 380, 160, 140,
    "deal_bachelor_bd4", 450, 450
  );

  // 26. Bachelor Deal BD#5 (Small Pizza + 4 Wings + Soft Drink)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    70, 560, 160, 140,
    "deal_bachelor_bd5", 450, 450
  );

  // 27. Bachelor Deal BD#6 (Medium Pizza + 6 Wings + Soft Drink)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    360, 560, 160, 140,
    "deal_bachelor_bd6", 450, 450
  );

  // 28. Bachelor Deal BD#7 (Double Decker Burger + Fries + Drink)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    70, 740, 160, 140,
    "deal_bachelor_bd7", 450, 450
  );

  // 29. Bachelor Deal BD#8 (2 Zinger Burgers + Drink)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    365, 740, 160, 140,
    "deal_bachelor_bd8", 450, 450
  );

  // 30. Family Deal FD#1 (Large Pizza + 8 Hot Wings + 1.5L)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    670, 260, 210, 180,
    "deal_family_fd1", 450, 450
  );

  // 31. Family Deal FD#2 (4 Jumbo Zinger Burgers + 4 Fries + 1.5L)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    930, 260, 310, 180,
    "deal_family_fd2", 450, 450
  );

  // 32. Family Deal FD#3 (Large Pizza 13\" + Medium Pizza 10\" + 1.5L)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    670, 470, 280, 180,
    "deal_family_fd3", 450, 450
  );

  // 33. Family Deal FD#4 (1 Large Pizza + 2 Zinger + 8 Wings + 2 Fries + 2.25L)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    950, 530, 310, 180,
    "deal_family_fd4", 450, 450
  );

  // 34. Family Deal FD#5 (2 Large Pizzas 13\" + 8 Wings + 1.5L)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    670, 690, 280, 180,
    "deal_family_fd5", 450, 450
  );

  // 35. Dips Sauces (Ranch, Peri Peri, Mayo Garlic, BBQ)
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    950, 810, 240, 100,
    "dips_flavour_bomb", 400, 400
  );

  // 36. Fruit Salad Bowl
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180623_eab414cd.png",
    260, 660, 180, 125,
    "salad_fresh_fruit_bowl", 400, 400
  );

  // 37. Additional variation pizza cropped from 180557
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180557_50c9116d.png",
    430, 0, 395, 230,
    "pizza_pan_golden_supreme", 450, 450
  );

  // 38. The Pizza Shop Logo / Brand Mark from flyer
  await cropToWhiteJpg(
    "public/assets/aistudio/Screenshot_2026-11-09_180543_428a6b12.png",
    1400, 180, 390, 200,
    "the_pizza_shop_logo", 450, 300
  );

  console.log("All main cropped product JPGs generated successfully!");
}

run();
