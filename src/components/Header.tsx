import { Link } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";
import { CartButton, HomeButton } from "../components";
import countAllItems from "../utils/countAllItems";

const Header = () => {
  const [getItems] = useShoppingCart();
  const itemsInCart = getItems();
  const quantity = countAllItems(itemsInCart);

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto py-4 px-8">
        <nav className="flex items-center justify-between">
          <div>
            <Link className="text-black-500" to={`/`}>
              <HomeButton />
            </Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link className="text-black-500" to={`/cart`}>
                  <CartButton quantity={quantity} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
