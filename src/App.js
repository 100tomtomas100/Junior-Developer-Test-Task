import { Route, Routes } from 'react-router-dom';
import ProductsContextProvider from "./context/ProductsContext";
import Home from "./pages/Home.js";
import AddProduct from "./pages/AddProduct";
import Footer from "./layouts/Footer";

function App() {
  return (
    <>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </ProductsContextProvider>
      <Footer />
    </>
  );
};

export default App;
