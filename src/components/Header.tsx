const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 px-8">
        <nav className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Your Logo</h1>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-blue-500">Koszyk</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;