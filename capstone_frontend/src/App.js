import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add';
import Edit from './components/Edit';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'

const App = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // CREATE FUNCTION \\
  const handleCreate = (addItem) => {
    axios.post('http://localhost:8000/api/item', addItem).then((response) => {
      console.log(response);
      setItems([...items, response.data]);
      setShowForm(false);
    });
  };

  // READ FUNCTION \\
  const getItems = () => {
    axios
      .get('http://localhost:8000/api/item')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // EDIT FUNCTION \\
  const handleUpdate = (editItem) => {
    console.log(editItem);
    axios
      .put('http://localhost:8000/api/item/' + editItem._id, editItem)
      .then((response) => {
        getItems();
      });
  };

  // DELETE FUNCTION \\
  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/item/' + event.target.value)
      .then((response) => {
        getItems();
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Container className="app-container">
        <h1 className="app-title">Ziggy's Wondrous Finds</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
          className="add-button"
        >
          {showForm ? 'Close Form' : 'Add Item'}
        </Button>
        {showForm && <Add handleCreate={handleCreate} />}
        <Row className="card-row">
          {items.map((item) => (
            <Col key={item._id} className="card-row">
              <div className="card">
                <img className="card-image" src={item.photo} alt={item.photo} />
                <div className="card-content">
                  <h2 className="card-title">{item.name}</h2>
                  <h3 className="card-subtitle">{item.color}</h3>
                  <p className="card-description">{item.description}</p>
                  <p className="card-price">${item.price}</p>
                  <p className="card-size">{item.size}</p>
                  <div className="card-buttons">
                    <Edit handleUpdate={handleUpdate} item={item} />
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      value={item._id}
                      className="delete-button"
                    >
                      X
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
