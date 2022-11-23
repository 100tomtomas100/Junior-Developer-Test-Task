import { Link } from 'react-router-dom';

import "./Header.css"

const Header = (props) => {
    const NewLink = ({link, button}) => {
        return (
            button && link? 
            <button><Link style={{textDecoration: "none", color: "black"}} to={link}>{button}</Link></button>:
            <button>{button}</button>
        );
    };
    return(
        <div id="header">
            <h1 id="header-title">{props.title}</h1>
            <div id="header-buttons">
                <NewLink button={props.button1.title} link={props.button1.link}/>
                <NewLink button={props.button2.title} link={props.button2.link}/>
            </div>            
        </div>
    )
}

export default Header;