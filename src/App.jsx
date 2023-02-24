import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [products, setProducts] = useState([]);
  let [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  let handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/product", product)
      .then((response) => {
        setProducts(response.data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="price" onChange={handleChange} />
        <input type="text" name="stock" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>data1</td>
            <td>data2</td>
            <td>data3</td>
          </tr> */}
          {products.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
