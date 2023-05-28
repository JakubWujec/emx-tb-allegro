import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 px-8">
        <nav className="flex items-center justify-between">
          <div>
            <Link className="text-blue-500" to={`/`}>Home</Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link className="text-blue-500" to={`/cart`}>Koszyk</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;