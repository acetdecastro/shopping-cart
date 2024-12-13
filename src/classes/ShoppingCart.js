import { PRODUCTS } from "../constants/products.js";

export class ShoppingCart {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.cartItems = [];
  }

  add(productCode, promoCode = null) {
    // find product using product code
    const product =
      PRODUCTS[
        Object.keys(PRODUCTS).find((key) => PRODUCTS[key].code === productCode)
      ];

    if (!product) throw new Error("Invalid product code");

    this.cartItems.push({ ...product });

    // add free data pack when adding a 2GB/ULT_MEDIUM product
    if (product.code === PRODUCTS.ULT_MEDIUM.code) {
      const dataPack = { ...PRODUCTS.DATA_PACK, price: 0 };
      this.cartItems.push(dataPack);
    }

    // set a promo code if it is provided
    if (promoCode) this.pricingRules.setPromoCode(promoCode);
  }

  total() {
    // apply pricing rules
    const itemsWithRulesApplied = this.pricingRules.applyRules(this.cartItems);

    const subtotal = itemsWithRulesApplied.reduce(
      (sum, item) => sum + item.price,
      0
    );

    // returns the unmodified subtotal if a promo code is NOT provided
    const finalTotal = this.pricingRules.applyPromoCodeDiscount(subtotal);

    return Number(finalTotal).toFixed(2);
  }

  /*
    returns something like:
    [ '3 x Unlimited 1GB', '1 x Unlimited 5GB' ]
  */
  items() {
    const itemCounts = {};

    this.cartItems.forEach((item) => {
      if (itemCounts[item.code]) {
        itemCounts[item.code].count += 1;
      } else {
        itemCounts[item.code] = { ...item, count: 1 };
      }
    });

    const formattedItems = Object.values(itemCounts).map((item) => {
      return `${item.count} x ${item.name}`;
    });

    return formattedItems;
  }
}
