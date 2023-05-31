import React, { useState, useEffect, PropsWithChildren } from "react";
import { createContext } from "react";
import { Product } from "../types";

interface CartContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
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
  const [cartItems, setCartItems] = useState<Product[]>(getInitialState);

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
