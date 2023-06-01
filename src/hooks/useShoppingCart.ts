import { useContext } from "react";
import { Product } from "../types";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

interface ShoppingCartHook {
  (): [
    () => Product[],
    (item: Product) => void,
    (item: Product) => void,
    (item?: Product) => number,
    (
      item: Product,
      quantity: number,
      mode: "add" | "subtract" | "change"
    ) => void
  ];
}

const useShoppingCart: ShoppingCartHook = () => {
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);

  const getItems = () => {
    return cartItems;
  };

  const getSum = (item?: Product) => {
    if (item) return item.quantity * item.price;
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addItem = (item: Product) => {
    setCartItems([...cartItems, item]);
  };

  const changeQuantity = (
    item: Product,
    quantity: number,
    mode: "add" | "subtract" | "change"
  ) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    let newBasketItems = [...cartItems];

    if (isNaN(quantity)) {
      quantity = 1;
    }

    if (mode === "add") newBasketItems[index].quantity += quantity;
    if (mode === "subtract") newBasketItems[index].quantity -= quantity;
    if (mode === "change") newBasketItems[index].quantity = quantity;

    if (newBasketItems[index].quantity <= 0) newBasketItems[index].quantity = 1;

    setCartItems(newBasketItems);
  };

  const removeItem = (item: Product) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const newBasketItems = [...cartItems];
    newBasketItems.splice(index, 1);
    setCartItems(newBasketItems);
  };

  return [getItems, addItem, removeItem, getSum, changeQuantity];
};

export default useShoppingCart;
