import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/Home/Home.js";
import AddProduct from "./components/Add-product/Add-product";
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />      
      </Routes>
      <Footer />
    </>
    // <div className="App">
    //   <Header title={"Product List"} button1={"Add"} button2={"Mass Delete"} />
    // </div>
  );
}

export default App;
