import { PricingRules, ShoppingCart } from "../src/classes/index.js";
import { PRODUCTS, PROMOS } from "../src/constants/index.js";

describe("Shopping Cart Scenarios", () => {
  test("Scenario 1: 3-for-2 for 1GB Sims", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_LARGE.code);

    expect(cart.total()).toBe("$94.70");
    expect(cart.items()).toEqual(["3 x Unlimited 1GB", "1 x Unlimited 5GB"]);
  });

  test("Scenario 2: 5GB Sims bulk discount", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_LARGE.code);
    cart.add(PRODUCTS.ULT_LARGE.code);
    cart.add(PRODUCTS.ULT_LARGE.code);
    cart.add(PRODUCTS.ULT_LARGE.code);

    expect(cart.total()).toBe("$209.40");
    expect(cart.items()).toEqual(["2 x Unlimited 1GB", "4 x Unlimited 5GB"]);
  });

  test("Scenario 3: 2GB Sims + free Data Pack", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.ULT_MEDIUM.code);
    cart.add(PRODUCTS.ULT_MEDIUM.code);

    expect(cart.total()).toBe("$84.70");
    expect(cart.items()).toEqual([
      "1 x Unlimited 1GB",
      "2 x Unlimited 2GB",
      "2 x 1 GB Data-pack",
    ]);
  });

  test("Scenario 4: Promo code applied", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    cart.add(PRODUCTS.ULT_SMALL.code);
    cart.add(PRODUCTS.DATA_PACK.code, PROMOS.I_LOVE_AMAYSIM.code);

    expect(cart.total()).toBe("$31.32");
    expect(cart.items()).toEqual(["1 x Unlimited 1GB", "1 x 1 GB Data-pack"]);
  });

  test("Provide an invalid product code", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    expect(() => {
      cart.add("invalid_product_code");
    }).toThrow("Invalid product code");
  });

  test("Provide an invalid promo code", () => {
    const pricingRules = new PricingRules();
    const cart = new ShoppingCart(pricingRules);

    expect(() => {
      cart.add(PRODUCTS.ULT_SMALL.code, "invalid_promo_code");
    }).toThrow("Invalid promo code");
  });
});
