import AddInput from "./AddInput";
import commonInputs from "./commonInputs";

const Inputs = (addInputProps) => {
  return (
    <fieldset id="product_form_main_info">
      <AddInput att={commonInputs("sku")} props={addInputProps} />
      <AddInput att={commonInputs("name")} props={addInputProps} />
      <AddInput att={commonInputs("price")} props={addInputProps} />
    </fieldset>
  );
};

export default Inputs;
