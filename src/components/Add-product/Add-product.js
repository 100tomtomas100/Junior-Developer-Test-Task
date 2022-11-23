import "./Add-product.css";
import Header from "../Header";

const Addproduct = () => {
    const button1Props = {
        title: "Save"
    }
    const button2Props = {
        title: "Cancel",
        link: "/"
    }

    return (
        <div id="add-product">
            <Header title={"Product Add"} button1={button1Props} button2={button2Props} />
        </div>
    )
}

export default Addproduct;