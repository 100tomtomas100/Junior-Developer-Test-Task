import React, { useContext, useEffect, useRef, useState } from "react";
import useDB from "../../hooks/useDB";
import "../../assets/productForm.css";
import { ProductsContext } from "../../context/ProductsContext";
import TypeSwitcher from "./TypeSwitcher";
import Inputs from "./Inputs";

const ProductForm = () => {
  const [switcherChoice, setSwitcherChoice] = useState("");
  const [validInput, setValidInput] = useState({});
  const [input, setInput] = useState({});
  const [emptyInputError, setEmptyInputError] = useState({});
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef([]);
  const [axiosProps, setAxiosProps] = useState("");
  const { products } = useContext(ProductsContext);
  useDB(axiosProps);

  //in case the page is loaded on add-product get product list from DB to check if SKU is used
  useEffect(() => {
    if (products.length === 0) {
      setAxiosProps({ method: "get" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // errors on submitting empty inputs
    const allInputs = formRef.current.querySelectorAll("input:invalid");
    const switcherInput = e.target.querySelectorAll("select:invalid");

    allInputs.forEach((input) => {
      setEmptyInputError((prevEmptyInputError) => ({
        ...prevEmptyInputError,
        [input.id]: "empty-input",
      }));
    });

    switcherInput.forEach((input) => {
      if (!switcherChoice) {
        setEmptyInputError((prevEmptyInputError) => ({
          ...prevEmptyInputError,
          [input.id]: "empty-input",
        }));
      }
    });

    if (allInputs.length > 0 || switcherInput.length > 0) {
      setSubmitError("Please, submit required data");
    } else {
      setAxiosProps({
        method: "post",
        param: { param: { input, switcherChoice } },
        navigate: "/",
      });
    }
  };

  const addInputProps = {
    setSubmitError: setSubmitError,
    validInput: validInput,
    setValidInput: setValidInput,
    input: input,
    setInput: setInput,
    setEmptyInputError: setEmptyInputError,
    emptyInputError: emptyInputError,
  };

  const typeSwitcherProps = {
    setSwitcherChoice: setSwitcherChoice,
    switcherChoice: switcherChoice,
    addInputProps: addInputProps,
  };

  return (
    <div id="form-wrapper" ref={formRef}>
      <form id="product_form" noValidate onSubmit={handleSubmit}>
        <Inputs {...addInputProps} />
        <TypeSwitcher {...typeSwitcherProps} />
      </form>
      <span className="submit-error">
        <p>{submitError}</p>
      </span>
    </div>
  );
};

export default ProductForm;
