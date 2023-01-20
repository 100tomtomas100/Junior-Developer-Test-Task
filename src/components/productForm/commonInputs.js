const commonInputs = (label) => {
  const inputs = {
    sku: {
      divClass: "form_input",
      wrapperClass: "wrapper",
      labelFor: "sku",
      inputType: "text",
      labelName: "SKU",
      inputId: "sku",
      errorClass: "error",
      validClass: "valid",
    },
    name: {
      divClass: "form_input",
      wrapperClass: "wrapper",
      labelFor: "name",
      inputType: "text",
      labelName: "Name",
      inputId: "name",
      errorClass: "error",
      validClass: "valid",
    },
    price: {
      divClass: "form_input",
      wrapperClass: "wrapper",
      labelFor: "price",
      inputType: "text",
      inputClass: "number",
      labelName: "Price($)",
      inputId: "price",
      errorClass: "error",
      validClass: "valid",
    },
  };
  return inputs[label];
};

export default commonInputs;
