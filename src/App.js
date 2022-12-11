import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import Home from "./components/Home/Home.js";
import AddProduct from "./components/Add-product/Add-product";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("http://tomas-test.atwebpages.com/PHP/").then(function(response){
    // axios.get("http://localhost/junior-developer-test/").then(function(response){
      setProducts(response.data);       
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home products={products} getProducts={getProducts} />}  />
        <Route path="/add-product" element={<AddProduct products={products} getProducts={getProducts} />}  />      
      </Routes>
      <Footer />
    </>
  );
};

export default App;
