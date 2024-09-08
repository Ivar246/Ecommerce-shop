import { BrowserRouter, Routes, Route } from "react-router-dom"
import Products from "./pages/Products"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Layout from "./pages/Layout"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/product-details" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
