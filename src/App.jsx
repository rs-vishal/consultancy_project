import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav.jsx'; 
import Home from './components/Home.jsx'; 
import About from './components/About.jsx';
import Contact from './components/Contact.jsx'; 
import Admin from './components/Admin.jsx'; 
import InvoiceGenerator from './components/InvoiceGenerator.jsx';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/invoice" element={<InvoiceGenerator />} />


      </Routes>
    </>
  );
}

export default App;
