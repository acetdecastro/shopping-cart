import { PricingRules, ShoppingCart } from "./classes/index.js";
import { PRODUCTS, PROMOS } from "./constants/index.js";

// 3-for-2 for 1GB sims
function scenario1() {
  const pricingRules = new PricingRules();
  const cart = new ShoppingCart(pricingRules);

  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_LARGE.code);

  console.log("\nScenario 1: 3-for-2 for 1GB sims");
  console.log("Cart Total:", cart.total());
  console.log("Cart Items:", cart.items());
}

// 5GB bulk discount
function scenario2() {
  const pricingRules = new PricingRules();
  const cart = new ShoppingCart(pricingRules);

  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_LARGE.code);
  cart.add(PRODUCTS.ULT_LARGE.code);
  cart.add(PRODUCTS.ULT_LARGE.code);
  cart.add(PRODUCTS.ULT_LARGE.code);

  console.log("\nScenario 2: 5GB sims bulk discount");
  console.log("Cart Total:", cart.total());
  console.log("Cart Items:", cart.items());
}

// 2GB + free Data Pack
function scenario3() {
  const pricingRules = new PricingRules();
  const cart = new ShoppingCart(pricingRules);

  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.ULT_MEDIUM.code);
  cart.add(PRODUCTS.ULT_MEDIUM.code);

  console.log("\nScenario 3: 2GB sims + free Data Pack");
  console.log("Cart Total:", cart.total());
  console.log("Cart Items:", cart.items());
}

// promo code applied
function scenario4() {
  const pricingRules = new PricingRules();
  const cart = new ShoppingCart(pricingRules);

  cart.add(PRODUCTS.ULT_SMALL.code);
  cart.add(PRODUCTS.DATA_PACK.code, PROMOS.I_LOVE_AMAYSIM.code);

  console.log("\nScenario 4: Promo code applied");
  console.log("Cart Total:", cart.total());
  console.log("Cart Items:", cart.items());
}

scenario1();
scenario2();
scenario3();
scenario4();
