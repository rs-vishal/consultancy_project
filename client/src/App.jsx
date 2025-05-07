import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import { PrimeReactProvider } from 'primereact/api';
import Footer from "./components/Footer";
import Login from "./Pages/Login"
import Signin from "./Pages/Signin";
function App() {
  return (
    <>
<NavBar />
<div className="h-16"></div>
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound/>} />
</Routes>
<Footer />
    </>
  );
}

export default App;
