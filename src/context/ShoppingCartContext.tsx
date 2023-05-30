import React, { useState, useEffect, PropsWithChildren } from "react";
import { createContext } from "react";
import { TermoblockItem } from "../types";

interface CartContextType {
  cartItems: TermoblockItem[];
  setCartItems: React.Dispatch<React.SetStateAction<TermoblockItem[]>>;
}

const ShoppingCartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

function getInitialState() {
  const cartFromLocalStorage = localStorage.getItem("shoppingCart");
  return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
}

const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<TermoblockItem[]>(getInitialState);

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem("shoppingCart");
    if (cartFromLocalStorage) setCartItems(JSON.parse(cartFromLocalStorage));
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
