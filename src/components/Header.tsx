import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import countAllItems from "../utils/countAllItems";
import CartButton from "./CartButton";
import HomeIcon from "./icons/HomeIcon";

const Header = () => {
  const { getItems } = useContext(ShoppingCartContext);

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
          <div className="flex flex-column items-center text-primary font-bold text-2xl gap-1">
            <p>Konfigurator emultimax</p>

            <img
              src={"./favicon.ico"}
              className="h-6 w-6"
              alt="Emultimax LOGO"
            />
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
