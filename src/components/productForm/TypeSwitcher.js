import typeSwitcherInputs from "./typeSwitcherInputs";
import AddInput from "./AddInput";
import { useRef } from "react";

const TypeSwitcher = (props) => {
  const addInputProps = props.addInputProps;
  const switcherRef = useRef(null);

  const handleSwitch = (e) => {
    //if switcher choice is changed remove previous choice input and symbol for valid input
    const prevChoice = switcherRef.current.querySelectorAll(
      ".type_switcher_choice"
    );
    prevChoice.forEach((choice) => {
      const inputClean = choice.querySelector("input").id;
      addInputProps.setInput((prevInput) => ({
        ...prevInput,
        [inputClean]: null,
      }));
      addInputProps.setValidInput((prevValidInput) => ({
        ...prevValidInput,
        [inputClean]: "",
      }));
    });
    props.setSwitcherChoice(e.target.value);
    // removes switcher choice from the list of empty inputs
    addInputProps.setEmptyInputError((prevEmptyInputError) => ({
      ...prevEmptyInputError,
      [e.target.id]: "",
    }));
  };

  const DVDChoice = [
    <div key="dvd_choice">
      <AddInput att={typeSwitcherInputs("size")} props={addInputProps} />
    </div>,
  ];

  const FurnitureChoice = [
    <div key="furniture_choice">
      <AddInput att={typeSwitcherInputs("height")} props={addInputProps} />
      <AddInput att={typeSwitcherInputs("width")} props={addInputProps} />
      <AddInput att={typeSwitcherInputs("length")} props={addInputProps} />
    </div>,
  ];

  const BookChoice = [
    <div key="book_choice">
      <AddInput att={typeSwitcherInputs("weight")} props={addInputProps} />
    </div>,
  ];

  const choices = {
    DVD: DVDChoice,
    Book: BookChoice,
    Furniture: FurnitureChoice,
  };

  return (
    <>
      <div
        className="form_input"
        id="product_form_type_switcher"
        ref={switcherRef}
      >
        <label htmlFor="productType">Type Switcher</label>
        <select
          id="productType"
          name="productType"
          onChange={handleSwitch}
          required
          value={props.switcherChoice}
          className={
            addInputProps.emptyInputError["productType"]
              ? addInputProps.emptyInputError["productType"]
              : ""
          }
        >
          <option value="" disabled hidden>
            Type Switcher
          </option>
          <option name="DVD" value="DVD">
            DVD
          </option>
          <option name="Book" value="Book">
            Book
          </option>
          <option name="Furniture" value="Furniture">
            Furniture
          </option>
        </select>
      </div>
      {choices[props.switcherChoice]}
    </>
  );
};

export default TypeSwitcher;
