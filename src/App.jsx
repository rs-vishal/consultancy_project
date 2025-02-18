import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import InvoiceGenerator from "./components/InvoiceGenerator";
import Products from "./components/Products";
function App() {
  return (
    <>
<NavBar />
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/invoice" element={<InvoiceGenerator />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound/>} />
</Routes>
    </>
  );
}

export default App;
