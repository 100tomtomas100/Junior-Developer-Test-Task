import "../assets/addProduct.css";
import Header from "../layouts/Header";
import ProductForm from "../components/productForm/ProductForm";

const AddProduct = () => {
  const button1Props = {
    title: "Save",
    type: "submit",
    form: "product_form",
  };
  const button2Props = {
    title: "Cancel",
    link: "/",
  };

  return (
    <div id="add-product">
      <Header
        title={"Product Add"}
        button1={button1Props}
        button2={button2Props}
      />
      <ProductForm />
    </div>
  );
};

export default AddProduct;
