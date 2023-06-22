import React, { createContext, useEffect, useState } from "react";
import type { Product } from "../types";

type ShoppingCartContext = {
  getItems: () => Product[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  getSum: (item?: Product) => number;
  changeQuantity: (
    item: Product,
    quantity: number,
    mode: "add" | "subtract" | "change"
  ) => void;
};

function getInitialState() {
  const cartFromLocalStorage = localStorage.getItem("shoppingCart");
  return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

type ShoppingCartProviderProps = {
  children: React.ReactNode | null;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>(getInitialState());

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem("shoppingCart");
    if (cartFromLocalStorage) setCartItems(JSON.parse(cartFromLocalStorage));
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

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
    const newBasketItems = [...cartItems];

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

  const contextValue = {
    getItems,
    getSum,
    addItem,
    changeQuantity,
    removeItem,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
