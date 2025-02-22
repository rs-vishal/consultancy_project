import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
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
        <Route path="*" element={<NotFound/>} />
</Routes>
    </>
  );
}

export default App;
