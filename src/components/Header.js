import { Link } from 'react-router-dom';

import "./Header.css"

const Header = (props) => {
    const NewLink = ({link, button}) => {        
        const attributes = { 
            type: button.type? button.type: "",
            form: button.form? button.form: "",
            id: button.id? button.id: ""
        };
        const buttonStyle = {
            textDecoration: "none",
            color: "black"
        };
        return (
            button.title && link? 
            <button {...attributes}><Link style={buttonStyle} to={link}>{button.title}</Link></button>:
            <button {...attributes}>{button.title}</button>
        );
    };
    return(
        <div id="header">
            <h1 id="header-title">{props.title}</h1>
            <div id="header-buttons">
                <NewLink button={props.button1} link={props.button1.link}/>
                <NewLink button={props.button2} link={props.button2.link}/>
            </div>            
        </div>
    )
}

export default Header;