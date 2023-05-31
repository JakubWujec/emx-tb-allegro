import React from "react";
import { TermoblockItemColor } from "../enums";
import useShoppingCart from "../hooks/useShoppingCart";
import ProductList from "../components/ProductList";

const Cart = () => {
  //const { cartItems, removeItem, addItem } = useContext(ShoppingCartContext);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  return (
    <>
      <div>Koszyk</div>
      <ProductList></ProductList>
      <button
        onClick={() =>
          addItem({
            id: 1,
            name: "Termoblock",
            price: 12,
            quantity: 1,
            details: {
              width: 111,
              height: 222,
              color: TermoblockItemColor.WHITE,
              felc: 12,
            },
          })
        }
      >
        Dodaj testowo
      </button>
      <div>Suma: {getSum(null)}</div>
    </>
  );
};

export default Cart;
