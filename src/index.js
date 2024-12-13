import { PricingRules, ShoppingCart } from "./classes/index.js";
import { PRODUCTS, PROMOS } from "./constants/index.js";

const pricingRules = new PricingRules();
const cart = new ShoppingCart(pricingRules);

// 3 for 2
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_LARGE.code);

// 5GB bulk discount
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_LARGE.code);
// cart.add(PRODUCTS.ULT_LARGE.code);
// cart.add(PRODUCTS.ULT_LARGE.code);
// cart.add(PRODUCTS.ULT_LARGE.code);

// 2GB + free Data Pack
// cart.add(PRODUCTS.ULT_SMALL.code);
// cart.add(PRODUCTS.ULT_MEDIUM.code);
// cart.add(PRODUCTS.ULT_MEDIUM.code);

// Promo code applied
cart.add(PRODUCTS.ULT_SMALL.code);
cart.add(PRODUCTS.DATA_PACK.code, PROMOS.I_LOVE_AMAYSIM.code);

console.log("Cart Total:", cart.total());
console.log("Cart Items:", cart.items());
