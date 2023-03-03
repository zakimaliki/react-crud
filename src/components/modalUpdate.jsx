import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalUpdate = ({id,name,price,stock}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [products, setProducts] = useState([]);
  let [product, setProduct] = useState({
    name,
    price,
    stock,
  });

  let handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/product/"+id, product)
      .then((response) => {
        setProducts(response.data);
        handleClose()
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="text"
                name="price"
                class="form-control"
                value={product.price}
                placeholder="price"
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input
                type="text"
                name="stock"
                class="form-control"
                value={product.stock}
                placeholder="stock"
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit">Submit</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdate;
