import MakeOrderButton from "../components/MakeOrderButton";
import ProductList from "../components/ProductList";
import useShoppingCart from "../hooks/useShoppingCart";
import { Product } from "../types";

const Cart = () => {
  //const { cartItems, removeItem, addItem } = useContext(ShoppingCartContext);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const products = getItems();

  return (
    <>
      <div>Koszyk</div>
      <ProductList></ProductList>
      <AddTestItemButton addItem={addItem}></AddTestItemButton>
      <br></br>
      <MakeOrderButton products={products}></MakeOrderButton>
      <div>Suma: {getSum(null)}</div>
    </>
  );
};

const AddTestItemButton = ({
  addItem,
}: {
  addItem: (item: Product) => void;
}) => {
  return (
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
            color: "white",
            felc: 12,
            hinges: "none",
            firstHole: {
              stringPosition: "na dole na środku",
              holeType: "dla Warmtec Controlbox",
            },
            hasSecondHole: false,
            hasPowerCordHole: false,
          },
        })
      }
    >
      Dodaj testowo
    </button>
  );
};

export default Cart;
