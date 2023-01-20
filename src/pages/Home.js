import "../assets/home.css";
import Header from "../layouts/Header";
import Content from "../components/InfoCards/Content";
import { useState } from "react";
import useDB from "../hooks/useDB";

const Home = () => {
  const [markedCards, setMarkedCards] = useState([]);
  const [remove, setRemove] = useState("");
  useDB(remove);

  const handleMarkedCards = (id) => {
    //add to state checked boxes and remove from state unchecked boxes
    const ifExist = markedCards.filter((card) => card === id);
    if (ifExist.length > 0) {
      setMarkedCards(markedCards.filter((card) => card !== id));
    } else {
      setMarkedCards([...markedCards, id]);
    }
  };

  const handleDelete = () => {
    setRemove({ method: "delete", ids: markedCards, reloadList: true });
  };

  const button1Props = {
    title: "ADD",
    link: "/add-product",
  };

  const button2Props = {
    title: "MASS DELETE",
    id: "delete-product-btn",
    click: handleDelete,
  };

  return (
    <div id="home">
      <Header
        title={"Product List"}
        button1={button1Props}
        button2={button2Props}
      />
      <Content marks={handleMarkedCards} />
    </div>
  );
};

export default Home;
