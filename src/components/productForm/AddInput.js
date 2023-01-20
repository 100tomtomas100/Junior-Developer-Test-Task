import { useState, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const AddInput = ({ props, att }) => {
  const [errorInput, setErrorInput] = useState({});
  const [skuTaken, setSkuTaken] = useState([]);
  const { products } = useContext(ProductsContext);

  const handleChange = (e) => {
    //reset submit error message and sku invalid input
    props.setSubmitError("");
    if (e.target.id === "sku") {
      e.target.setCustomValidity("");
    }

    //display error on incorrect symbol press
    if (
      e.target.classList.contains("number") &&
      /[ a-zA-Z`!@#$%^&*()_+¬£\-=\[\]{};':"\\|,<>\/?~]/.test(e.target.value)
    ) {
      setErrorInput({
        ...errorInput,
        [e.target.id]: "Please, provide the data of indicated type",
      });
    } else {
      setErrorInput({ ...errorInput, [e.target.id]: "" });
    }

    //display valid on correct input
    if (e.target.validity.valid) {
      props.setValidInput({ ...props.validInput, [e.target.id]: "✓" });
    } else {
      props.setValidInput({ ...props.validInput, [e.target.id]: "" });
    }

    //delete all the letters from number inputs and allow dot to be used only once
    if (
      e.target.classList.contains("number") &&
      e.target.value.split("").filter((symbol) => symbol === ".").length >= 2
    ) {
      props.setInput({
        ...props.input,
        [e.target.id]: e.target.value.slice(0, -1),
      });
    } else if (e.target.classList.contains("number")) {
      props.setInput({
        ...props.input,
        [e.target.id]: e.target.value.replace(/[^0-9.]/g, ""),
      });
      //if acceptable set input value
    } else {
      props.setInput({ ...props.input, [e.target.id]: e.target.value });
    }

    //check if sku is already used
    if (e.target.id === "sku") {
      if (skuTaken.length === 0) {
        products.forEach((product) => {
          setSkuTaken((prevSkuTaken) => [...prevSkuTaken, product.sku]);
        });
      }

      skuTaken.forEach((sku) => {
        if (sku === e.target.value) {
          setErrorInput({
            ...errorInput,
            [e.target.id]: "This SKU is already in use!",
          });
          e.target.setCustomValidity("Invalid field.");
        }
      });
    }
  };

  return (
    <>
      <div className={att.divClass}>
        <span className={att.wrapperClass}>
          <label htmlFor={att.labelFor}>{att.labelName}</label>
          <input
            id={att.inputId}
            name={att.labelFor}
            value={props.input[att.inputId] || ""}
            required
            onChange={handleChange}
            className={`${att.inputClass ? att.inputClass : ""} ${
              props.emptyInputError[att.inputId]
                ? props.emptyInputError[att.inputId]
                : ""
            }`}
            type={att.inputType}
          ></input>
        </span>
        <span>
          <p
            className={
              errorInput[att.inputId] ? att.errorClass : att.validClass
            }
          >
            {errorInput[att.inputId]
              ? errorInput[att.inputId]
              : props.validInput[att.inputId]}
          </p>
        </span>
      </div>
      {att.description ? (
        <p className={att.descriptionClass ? att.descriptionClass : ""}>
          {att.description}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default AddInput;
