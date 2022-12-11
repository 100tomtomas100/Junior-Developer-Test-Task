import './Content.css';
import InfoCard from "./InfoCard";

const Content = (props) => {

    return(
        <div className='content'>
            {props.products.products.map(product => {
                return (
                    <InfoCard props={product} key={product.sku} marks={props.marks}/>                   
                );               
            })}
        </div>
    );
};

export default Content;