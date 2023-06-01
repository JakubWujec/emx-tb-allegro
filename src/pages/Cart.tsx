import MakeOrderButton from "../components/MakeOrderButton";
import ProductList from "../components/ProductList";
import useShoppingCart from "../hooks/useShoppingCart";

const Cart = () => {
  //const { cartItems, removeItem, addItem } = useContext(ShoppingCartContext);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const products = getItems();

  return products.length ? (
    <>
      <ProductList />
      <MakeOrderButton products={products} />
    </>
  ) : (
    <h1 className="text-center font-semibold text-2xl mt-56">
      Brak towarów w koszyku
    </h1>
  );
};

export default Cart;
