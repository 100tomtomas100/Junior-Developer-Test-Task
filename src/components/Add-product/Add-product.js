import "./Add-product.css";
import Header from "../Header";
import ProductForm from "./Product-form";

const AddProduct = (products) => {
    const button1Props = {
        title: "Save",
        type: "submit",
        form: "product_form"
    };
    const button2Props = {
        title: "Cancel",
        link: "/"
    };

    return (
        <div id="add-product">
            <Header title={"Product Add"} button1={button1Props} button2={button2Props} />
            <ProductForm products={products} />
        </div>
    );
};

export default AddProduct;