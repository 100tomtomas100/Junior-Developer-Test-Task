import { createContext, useState } from "react";

export const ProductsContext = createContext(null);

export default ({ children }) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
