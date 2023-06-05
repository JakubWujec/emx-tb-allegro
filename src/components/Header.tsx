import { Link } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";
import countAllItems from "../utils/countAllItems";
import HomeIcon from "./icons/HomeIcon";
import CartButton from "./CartButton";

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
              <HomeIcon />
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
