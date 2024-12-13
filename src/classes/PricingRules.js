import { PRODUCTS, PROMOS } from "../constants/index.js";

export class PricingRules {
  constructor(promoCode) {
    this.promoCode = promoCode;
  }

  applyRules(items) {
    let updatedItems = [...items];

    // 3 for 2 deal on Unlimited 1GB Sims
    updatedItems = this.applyThreeForTwo(updatedItems);

    return updatedItems;
  }

  /*
    3 for 2 deal on Unlimited 1GB Sims
    if you buy 3 Unlimited 1GB Sims, you will pay the price of 2 only for the first month
  */
  applyThreeForTwo(items) {
    // extract Unlimited 1GB items
    const smallItems = items.filter(
      (item) => item.code === PRODUCTS.ULT_SMALL.code
    );

    // if fewer than 3 Unlimited 1GB items, no promotion applies
    if (smallItems.length < 3) {
      return items;
    }

    // extract other items that are NOT Unlimited 1GB
    const otherItems = items.filter(
      (item) => item.code !== PRODUCTS.ULT_SMALL.code
    );

    // create a new array where every third small item is free (price set to 0)
    const updatedSmallItems = smallItems.map((item, index) => {
      if (index % 3 === 2) {
        // every third item (index 2, 5, 8, ...) is free
        return { ...item, price: 0 };
      }
      return item;
    });

    // merge other items with the updated small items
    const updatedItems = [...otherItems, ...updatedSmallItems];

    return updatedItems;
  }

  setPromoCode(code) {
    if (PROMOS[Object.keys(PROMOS).find((key) => PROMOS[key].code === code)]) {
      this.promoCode = code;
    } else {
      throw new Error("Invalid promo code");
    }
  }

  applyPromoCodeDiscount(total) {
    switch (this.promoCode) {
      case PROMOS.I_LOVE_AMAYSIM.code:
        return total - total * PROMOS.I_LOVE_AMAYSIM.discount;
      default:
        return total;
    }
  }
}
