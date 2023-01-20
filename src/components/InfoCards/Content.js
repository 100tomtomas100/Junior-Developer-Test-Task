import "../../assets/content.css";
import InfoCard from "./InfoCard";
import useDB from "../../hooks/useDB";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Content = (props) => {
  useDB({ method: "get" });
  const products = useContext(ProductsContext);
  return (
    <div className="content">
      {products.products.map((product) => {
        return (
          <InfoCard props={product} key={product.sku} marks={props.marks} />
        );
      })}
    </div>
  );
};

export default Content;
