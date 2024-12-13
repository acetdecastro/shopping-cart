import { PRODUCTS, PROMOS } from "../constants/index.js";

export class PricingRules {
  constructor(promoCode) {
    this.promoCode = promoCode;
  }

  applyRules(items) {
    let updatedItems = [...items];

    // 3 for 2 deal on 1GB Sims
    updatedItems = this.applyThreeForTwo(updatedItems);

    // bulk discount for 5GB Sims
    updatedItems = this.applyBulkDiscountForLargeItems(updatedItems);

    return updatedItems;
  }

  /*
    3 for 2 deal on 1GB Sims
    if you buy 3 1GB Sims, you will pay the price of 2 only for the first month
  */
  applyThreeForTwo(items) {
    // extract 1GB items
    const smallItems = items.filter(
      (item) => item.code === PRODUCTS.ULT_SMALL.code
    );

    // if fewer than 3 1GB items, no promotion applies
    if (smallItems.length < 3) {
      return items;
    }

    // extract other items that are NOT 1GB
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

  /*
    The 5GB Sim will have a bulk discount applied;
    whereby the price will drop to $39.90 each for the first month, if the customer buys more than 3
  */
  applyBulkDiscountForLargeItems(items) {
    // extract 5gb items
    const largeItems = items.filter(
      (item) => item.code === PRODUCTS.ULT_LARGE.code
    );

    // no discount if there are 3 or fewer 5GB items
    if (largeItems.length <= 3) {
      return items;
    }

    // create a new array and set all large items' price to 39.90
    const updatedLargeItems = largeItems.map((item) => ({
      ...item,
      price: PRODUCTS.ULT_LARGE.bulkDiscountPrice,
    }));

    const otherItems = items.filter(
      (item) => item.code !== PRODUCTS.ULT_LARGE.code
    );

    // merge other items with the updated small items
    const updatedItems = [...otherItems, ...updatedLargeItems];

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
