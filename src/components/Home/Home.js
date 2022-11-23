import './Home.css';
import Header from "../Header";

const Home = () => {
    const button1Props = {
        title: "ADD",
        link: "/addproduct"
    }
    const button2Props = {
        title: "Mass Delete"
    }

    return (
        <div id="home" >
        <Header title={"Product List"} button1={button1Props} button2={button2Props} />
        </div>
    )
}

export default Home;