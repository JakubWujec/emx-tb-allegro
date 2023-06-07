import MakeOrderButton from "../components/MakeOrderButton";
import ProductList from "../components/ProductList";
import useShoppingCart from "../hooks/useShoppingCart";

const Cart = () => {
  //const { cartItems, removeItem, addItem } = useContext(ShoppingCartContext);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const products = getItems();

  if (!products.length) {
    return <EmptyCart></EmptyCart>;
  }

  return (
    <>
      <ProductList />
      <MakeOrderButton products={products} />
    </>
  );
};

const EmptyCart = () => {
  return (
    <h1 className="text-center font-semibold text-2xl mt-56">
      Brak towarów w koszyku
    </h1>
  );
};

export default Cart;
