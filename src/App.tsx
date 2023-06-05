import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import ConfiguratorUp from "./pages/ConfiguratorUp";
import ConfiguratorGo from "./pages/ConfiguratorGo";
import ConfiguratorPro from "./pages/ConfiguratorPro";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <ShoppingCartProvider>
          <Header />
          <main className="container mx-auto py-8 px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/up" element={<ConfiguratorUp />} />
              <Route path="/go" element={<ConfiguratorGo />} />
              <Route path="/pro" element={<ConfiguratorPro />} />
            </Routes>
          </main>
        </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
