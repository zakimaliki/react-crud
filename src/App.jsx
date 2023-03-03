import axios from "axios";
import { useEffect, useState } from "react";
import ModalCreate from "./components/modalCreate";
import ModalDelete from "./components/modalDelete";
import ModalUpdate from "./components/modalUpdate";

function App() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <ModalCreate/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td><ModalUpdate id={item.id} name={item.name} price={item.price} stock={item.stock}/> <ModalDelete id={item.id}/></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
