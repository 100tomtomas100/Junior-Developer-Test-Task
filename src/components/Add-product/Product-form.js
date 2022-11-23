import "./Product-form.css";

const ProductForm = () => {

    return (        
        <form id="product_form">
            <fieldset id="product_form_main_info">
                <div className="form_input">
                    <label htmlFor="sku">SKU</label>
                    <input id="sku" name="sku"></input>
                </div>
                <div className="form_input">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name"></input>
                </div>
                <div className="form_input">
                    <label htmlFor="price">Price($)</label>
                    <input id="price" name="price"></input>
                </div>
            </fieldset>
            <div className="form_input" id="product_form_type_switcher">
                <label htmlFor="productType">Type Switcher</label>
                <select id="productType" name="productType">
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>
            </div>
            
        </form>        
    );
};

export default ProductForm; 