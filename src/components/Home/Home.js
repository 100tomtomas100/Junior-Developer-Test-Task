import './Home.css';
import Header from "../Header";
import Content from "./Content";
import { useState } from "react";
import axios from 'axios';

const Home = (products) => {
    const [markedCards, setMarkedCards] = useState([]);
    
    const handleMarkedCards = (id) => {   

        //add to state checked boxes and remove from state unchecked boxes        
        const ifExist = markedCards.filter(card => card == id);            
        if (ifExist.length > 0) {
            setMarkedCards(markedCards.filter(card => card != id));
        } else {
            setMarkedCards([
                ...markedCards, id 
            ]);
        };
    };

    const handleDelete = async() => {
        for (let i = 0; markedCards.length > i; i++) {
            await axios.delete(`http://tomas-test.atwebpages.com/PHP/?id=${markedCards[i]}`).then(function(){
            // await axios.delete(`http://localhost/junior-developer-test/?id=${markedCards[i]}`).then(function(){               
            }).catch(error => {                
                console.error('There was an error!', error);
            });
        };
        products.getProducts();
    };

    const button1Props = {
        title: "ADD",
        link: "/add-product"
    };

    const button2Props = {
        title: "MASS DELETE",
        id: "delete-product-btn",
        click: handleDelete
    };

    return (
        <div id="home" >
            <Header title={"Product List"} button1={button1Props} button2={button2Props} />
            <Content marks={handleMarkedCards} products={products}/>
        </div>
    );
};

export default Home;