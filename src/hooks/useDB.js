import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const useDB = (props) => {
  const { setProducts } = useContext(ProductsContext);
  const navigate = useNavigate();
  // const url = "http://tomas-test.atwebpages.com/PHP/"
  const url = "http://localhost/junior-developer-test/";

  useEffect(() => {
    const db = async (id) => {
      await axios[props.method](
        `${url}${id ? `?id=${id}` : ""}`,
        props.param ? props.param : ""
      )
        .then(function (response) {
          if (props.method === "get") {
            setProducts(response.data);
          }
          //reload  the list of products on delete request or when reload is specified in the props
          if (
            (props.reloadList &&
              props.method === "delete" &&
              props.ids[props.ids.length - 1] === id) ||
            (props.method !== "delete" && props.reloadList)
          ) {
            axios.get(`${url}`).then(function (response) {
              setProducts(response.data);
            });
          }
          if (props.navigate) {
            navigate(props.navigate);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };
    //for deleting multiple ids
    if (props.method === "delete") {
      (async () => {
        for (const id of props.ids) {
          await db(id);
        }
      })();
    }

    if ((props.method === "get") | (props.method === "post")) {
      db();
    }
  }, [props.method, props.ids, props.param]);
};
export default useDB;
