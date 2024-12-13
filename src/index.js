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
cart.add(PRODUCTS.ULT_SMALL.code);
cart.add(PRODUCTS.ULT_SMALL.code);
cart.add(PRODUCTS.ULT_LARGE.code);
cart.add(PRODUCTS.ULT_LARGE.code);
cart.add(PRODUCTS.ULT_LARGE.code);
cart.add(PRODUCTS.ULT_LARGE.code);

console.log("Cart Total:", cart.total());
console.log("Cart Items:", cart.items());
