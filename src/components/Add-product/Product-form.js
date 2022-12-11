import React, { useState } from "react";
import axios from "axios";

import "./Product-form.css";
import { useNavigate } from "react-router-dom";

const ProductForm = (products) => {
    const [switcherChoice, setSwitcherChoice] = useState("");
    const [errorInput, setErrorInput] = useState({});
    const [validInput, setValidInput] = useState({});
    const [input, setInput] = useState({});
    const [emptyInputError, setEmptyInputError] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [skuTaken, setSkuTaken] = useState([]);
    
    const navigate = useNavigate();

    const handleSwitch = (e) => {        

        //remove previous choice input and symbol for valid input
        const prevChoice = document.querySelectorAll(".type_switcher_choice");
        prevChoice.forEach(choice => {
            const inputClean = choice.querySelector("input").id;
            setInput(prevInput => ({...prevInput,
                [inputClean]: null
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

        //reset submit error message and sku invalid input
        setSubmitError("");
        document.getElementById(e.target.id).setCustomValidity("");

        //display error on incorrect symbol press
        if(e.target.classList.contains("number") && (/[ a-zA-Z`!@#$%^&*()_+¬£\-=\[\]{};':"\\|,<>\/?~]/).test(e.target.value)){
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

        //delete all the letters from number inputs and allow dot to be used only once
        if(e.target.classList.contains("number") && ((e.target.value).split("")).filter(symbol => symbol === ".").length >= 2) {
            setInput({...input,
                [e.target.id]: (e.target.value).slice(0, -1)
            });
        } else if (e.target.classList.contains("number")) {
            setInput({...input,
                [e.target.id]: (e.target.value).replace(/[^0-9.]/g,'')
            });
        } else {
            setInput({...input,
                [e.target.id]: (e.target.value)
            });
        };

        //check if sku is already used
        if (e.target.id === "sku") {
            if (skuTaken.length == 0) {
               (products.products.products).forEach(product => {
                    setSkuTaken(prevSkuTaken => ([
                        ...prevSkuTaken, product.sku
                    ]));
                }); 
            };            
           
            skuTaken.forEach(sku => {
                if(sku === e.target.value){
                    setErrorInput({...errorInput,
                        [e.target.id]:  "This SKU is already in use!"              
                    }); 
                    document.getElementById(e.target.id).setCustomValidity("Invalid field.");       
                };
            });
        };
    };

    const handleSubmit = (e) => {        
        e.preventDefault();

        const allInputs = (e.target).querySelectorAll("input:invalid");
        const switcherInput = (e.target).querySelectorAll("select:invalid");

        // errors on submitting empty inputs
        allInputs.forEach(input => {
            setEmptyInputError(prevEmptyInputError => ({...prevEmptyInputError,
                [input.id]: "empty-input"
            }));  
        });        

        switcherInput.forEach(input => {
            if(!switcherChoice){
                setEmptyInputError(prevEmptyInputError => ({...prevEmptyInputError,
                    [input.id]: "empty-input"
                }));  
            };  
        });

        if(allInputs.length > 0 || switcherInput.length > 0) {
            setSubmitError("Please, submit required data");
        } else {
            // if all the inputs are correctly filled 
            axios.post("http://tomas-test.atwebpages.com/PHP/", {param:{input, switcherChoice}}).then(function(){    
            // axios.post("http://localhost/junior-developer-test/", {param:{input, switcherChoice}}).then(function(){         
            products.products.getProducts();
            navigate("/");
            });
        };       
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
                        <option name="DVD" value="DVD">DVD</option>
                        <option name="Book" value="Book">Book</option>
                        <option name="Furniture" value="Furniture">Furniture</option>
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