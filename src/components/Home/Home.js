import './Home.css';
import Header from "../Header";

const Home = () => {
    const button1Props = {
        title: "ADD",
        link: "/add-product"
    }
    const button2Props = {
        title: "Mass Delete",
        id: "delete-product-btn"
    }

    return (
        <div id="home" >
        <Header title={"Product List"} button1={button1Props} button2={button2Props} />
        </div>
    )
}

export default Home;