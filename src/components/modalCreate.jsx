import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalCreate = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [products, setProducts] = useState([]);
  let [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
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
      .post("http://localhost:3001/product", product)
      .then((response) => {
        setProducts(response.data);
        handleClose()
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="name"
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="text"
                name="price"
                class="form-control"
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

export default ModalCreate;
