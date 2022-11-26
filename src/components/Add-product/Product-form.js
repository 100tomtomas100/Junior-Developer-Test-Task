import React, { useState } from "react";

import "./Product-form.css";

const ProductForm = () => {
    const [switcherChoice, setSwitcherChoice] = useState("");
    const [errorInput, setErrorInput] = useState({});
    const [validInput, setValidInput] = useState({});
    const [input, setInput] = useState({});
    const [emptyInputError, setEmptyInputError] = useState({});
    const [submitError, setSubmitError] = useState("");

    const handleSwitch = (e) => {        

        //remove previous choice input and symbol for valid input
        const prevChoice = document.querySelectorAll(".type_switcher_choice");
        prevChoice.forEach(choice => {
            const inputClean = choice.querySelector("input").id;
            setInput(prevInput => ({...prevInput,
                [inputClean]: ""
            }));
            setValidInput(prevValidInput => ({...prevValidInput,
                [inputClean]:  ""              
            }));
        });
        
        setSwitcherChoice(            
            e.target.value           
        );
        setEmptyInputError(prevEmptyInputError => ({...prevEmptyInputError,
            [e.target.id]: ""
        }));        
    };

    const handleError = (e) => {  
        setSubmitError("");

        //display error on incorrect symbol press
        if(e.target.classList.contains("number") && (/[ a-zA-Z`!@#$%^&*()_+¬£\-=\[\]{};':"\\|,.<>\/?~]/).test(e.target.value)){
            setErrorInput({...errorInput,
                [e.target.id]: "Please, provide the data of indicated type"              
            });          
        } else {
            setErrorInput({...errorInput,
                [e.target.id]:  ""              
            });            
        }; 

        //display valid on correct input
        if(e.target.validity.valid) {
            setValidInput({...validInput,
                [e.target.id]:  "✓"              
            }); 
        } else {
            setValidInput({...validInput,
                [e.target.id]:  ""              
            }); 
        };

        //delete all the letters from number inputs
        if(e.target.classList.contains("number")) {
            setInput({...input,
                [e.target.id]: (e.target.value).replace(/[^0-9]/g,'')
            });
        } else {
            setInput({...input,
                [e.target.id]: (e.target.value)
            });
        };
    };

    const handleSubmit = (e) => { 
        e.preventDefault();
        const allInputs = (e.target).querySelectorAll("input:invalid");
        allInputs.forEach(input => {
            setEmptyInputError(prevEmptyInputError => ({...prevEmptyInputError,
                [input.id]: "empty-input"
            }));  
            setSubmitError("Please, submit required data");
        });
        
        const switcherInput = (e.target).querySelectorAll("select:invalid");
        switcherInput.forEach(input => {
            if(!switcherChoice){
                setSubmitError("Please, submit required data");
                setEmptyInputError(prevEmptyInputError => ({...prevEmptyInputError,
                    [input.id]: "empty-input"
                }));  
            };  
        });
        
    };

    const addInput = (att) => {
        return (
            <>
            <div className={att.divClass}>
                <span className={att.wrapperClass}>
                    <label htmlFor={att.labelFor}>{att.labelName}</label>
                    <input id={att.inputId} name={att.labelFor} value={input[att.inputId] || ""} required onChange={handleError}
                        className={`${att.inputClass? att.inputClass: ""} ${emptyInputError[att.inputId]? emptyInputError[att.inputId]: ""}`} 
                        type={att.inputType}>                        
                    </input>
                </span>
                <span>
                    <p className={errorInput[att.inputId]? att.errorClass: att.validClass}>
                        {errorInput[att.inputId]? errorInput[att.inputId]: validInput[att.inputId]}
                    </p>
                </span>                
            </div>
            {att.description? <p className={att.descriptionClass? att.descriptionClass: ""}>{att.description}</p>: ""}
            </>
        );
    };

    const DVDChoice = [
        <div key="dvd_choice">
            {addInput({
                divClass: "form_input type_switcher_choice",
                wrapperClass: "wrapper",
                labelFor: "dvd_choice",
                inputType: "text",
                inputClass: "number",
                labelName: "Size (MB)",
                inputId: "size",
                description: "Please, provide size",
                descriptionClass: "item_description",
                errorClass: "error",
                validClass: "valid"
            })}
        </div>
    ];

    const FurnitureChoice = [
        <div key="furniture_choice">
             {addInput({
                divClass: "form_input type_switcher_choice",
                wrapperClass: "wrapper",
                labelFor: "furniture_choice_height",
                inputType: "text",
                inputClass: "number",
                labelName: "Height (CM)",
                inputId: "height",
                errorClass: "error",
                validClass: "valid"
            })}
            {addInput({
                divClass: "form_input type_switcher_choice",
                wrapperClass: "wrapper",
                labelFor: "furniture_choice_width",
                inputType: "text",
                inputClass: "number",
                labelName: "Width (CM)",
                inputId: "width",
                errorClass: "error",
                validClass: "valid"
            })}
            {addInput({
                divClass: "form_input type_switcher_choice",
                wrapperClass: "wrapper",
                labelFor: "furniture_choice_length",
                inputType: "text",
                inputClass: "number",
                labelName: "Length (CM)",
                inputId: "length",
                errorClass: "error",
                validClass: "valid",
                description: "Please, provide dimensions",
                descriptionClass: "item_description",
            })}
        </div>
    ];
   

    const BookChoice = [     
        <div key="book_choice">
            {addInput({
                divClass: "form_input type_switcher_choice",
                wrapperClass: "wrapper",
                labelFor: "book_choice",
                inputType: "text",
                inputClass: "number",
                labelName: "Weight (kg)",
                inputId: "weight",
                errorClass: "error",
                validClass: "valid",
                description: "Please, provide weight",
                descriptionClass: "item_description",
            })}
        </div>    
    ];
        
    const choices = {
        DVD: DVDChoice,
        Book: BookChoice,
        Furniture: FurnitureChoice
    };

    return (
        <div id="form-wrapper">       
            <form id="product_form" noValidate onSubmit={handleSubmit}>
                <fieldset id="product_form_main_info">
                    {addInput({
                        divClass: "form_input",
                        wrapperClass: "wrapper",
                        labelFor: "sku",
                        inputType: "text",
                        labelName: "SKU",
                        inputId: "sku",
                        errorClass: "error",
                        validClass: "valid"
                    })}
                    {addInput({
                        divClass: "form_input",
                        wrapperClass: "wrapper",
                        labelFor: "name",
                        inputType: "text",
                        labelName: "Name",
                        inputId: "name",
                        errorClass: "error",
                        validClass: "valid"
                    })}
                    {addInput({
                        divClass: "form_input",
                        wrapperClass: "wrapper",
                        labelFor: "price",
                        inputType: "text",
                        inputClass: "number",
                        labelName: "Price($)",
                        inputId: "price",
                        errorClass: "error",
                        validClass: "valid"
                    })}
                </fieldset>
                <div className="form_input" id="product_form_type_switcher">
                    <label htmlFor="productType">Type Switcher</label>
                    <select id="productType" name="productType" onChange={handleSwitch} required value={switcherChoice}
                    className={emptyInputError["productType"]? emptyInputError["productType"]: ""}> 
                        <option value="" disabled hidden>Type Switcher</option>                   
                        <option value="DVD">DVD</option>
                        <option value="Book">Book</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                </div>            
                {choices[switcherChoice]}
            </form>
            <span className="submit-error">
                <p>{submitError}</p>
            </span>
        </div>         
    );
};

export default ProductForm; 