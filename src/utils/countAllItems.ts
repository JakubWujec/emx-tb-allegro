import { Product } from "../types";

const countAllItems = (cartItems: Product[]) => {
  return cartItems.reduce(
    (sum: number, item: Product) => sum + item.quantity,
    0
  );
};

export default countAllItems;
