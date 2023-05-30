import { useContext } from "react";
import { TermoblockItem } from "../types";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

interface ShoppingCartHook {
  (): [
    () => TermoblockItem[],
    (item: TermoblockItem) => void,
    (item: TermoblockItem) => void,
    (item: TermoblockItem | null) => number,
    (item: TermoblockItem, quantity: number) => void
  ];
}

const useShoppingCart: ShoppingCartHook = () => {
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);

  const getItems = () => {
    return cartItems;
  };

  const getSum = (item: TermoblockItem | null) => {
    if (item) return item.quantity * item.price;
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  const addItem = (item: TermoblockItem) => {
    setCartItems([...cartItems, item]);
  };

  const changeQuantity = (item: TermoblockItem, quantity: number) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    let newBasketItems = [...cartItems];

    newBasketItems[index].quantity += quantity;

    setCartItems(newBasketItems);
  };

  const removeItem = (item: TermoblockItem) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    const newBasketItems = [...cartItems];
    newBasketItems.splice(index, 1);
    setCartItems(newBasketItems);
  };

  return [getItems, addItem, removeItem, getSum, changeQuantity];
};

export default useShoppingCart;
