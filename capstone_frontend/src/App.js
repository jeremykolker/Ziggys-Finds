import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add';
import Edit from './components/Edit';
import './App.css';
import { Container, Row, Col, Button, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';


const App = () => {
  const [items, setItems] = useState([]);
  const [showForm, setAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // CREATE FUNCTION \\
  const handleCreate = (addItem) => {
    axios.post('http://localhost:8000/api/item', addItem).then((response) => {
      console.log(response);
      getItems()
      setAddForm(false);
    });
  };

  // READ FUNCTION \\
  const getItems = () => {
    axios.get('http://localhost:8000/api/item').then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // EDIT FUNCTION \\
  const handleUpdate = (editItem) => {
    console.log(editItem);
    axios.put('http://localhost:8000/api/item/' + editItem.id, editItem).then((response) => {
        getItems();
      });
  };

  // DELETE FUNCTION \\
  const handleDelete = (event) => {
    axios.delete('http://localhost:8000/api/item/' + event.target.value).then((response) => {
      getItems();
    });
  };

  // FILTER FUNCTION \\
  const filterItems = (item) => {
    if (searchTerm === '') {
      return true;
    } else if (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Container className="app-container">
     
        <h1 className="title">Ziggy's Finds</h1>
        
        <Row className="card-row">
          {items.filter(filterItems).map((item) => (
            <Col key={item.id} className="card-row">
              <div className="card">
              <img className="card-image" src={item.photo_url} alt={item.photo_url} />
                <div className="card-content">
                  <h2 className="card-title">{item.name}</h2>
                  <h3 className="card-subtitle">{item.color}</h3>
                  <p className="card-description">{item.description}</p>
                  <p className="card-price">${item.price}</p>
                  <p className="card-size">{item.size}</p>
                  <div className="card-buttons">
                    <Edit handleUpdate={handleUpdate} item={item} />
                    <br></br>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      value={item.id}
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
        <Form.Group className="search" controlId="search">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </Form.Group>
        <div class="add">
         <button
          variant="primary"
          onClick={() => setAddForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add Item'}
        </button>
        {showForm && <Add handleCreate={handleCreate} />}
        </div>
    </>
  );
};

export default App;
