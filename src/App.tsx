import './App.css'
import Cart from './pages/Cart'
import Home from './pages/Home';
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="container mx-auto py-8 px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
