import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"
import Register from "./pages/Register"
import CreateProduct from "./pages/CreateProduct"

function App(){
 return(
  <BrowserRouter>
  <Navbar/>
  <div className="container mx-auto px-4 py-6">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/create" element={<CreateProduct />} />
    </Routes>
  </div>
  </BrowserRouter>
 )
}

export default App