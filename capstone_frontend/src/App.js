import React, { useState, useEffect } from 'react';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';
import Add from './components/Add';
import Edit from './components/Edit';
import './App.css';
import { Container, Row, Col, Collapse, Button, Form, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap';



const App = () => {
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [items, setItems] = useState([]);
  const [showForm, setAddForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackground, setShowBackground] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleBackground = () => {
    setShowBackground(!showBackground);
  };
  

  
  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (e) => {
    if (showMenu && !e.target.closest(".collapsible-nav")) {
      setShowMenu(false);
    }
  };

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

  // SORT FUNCTIONS \\
  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortOrder('asc');
    }
  };

  const sortItems = (a, b) => {
    const sortFunc =
      sortBy === 'name'
        ? (a, b) => a.name.localeCompare(b.name)
        : (a, b) => a.price - b.price;

    if (sortOrder === 'asc') {
      return sortFunc(a, b);
    } else {
      return sortFunc(b, a);
    }
  };

  const filteredAndSortedItems = items
  .filter(filterItems)
  .sort((a, b) => sortItems(a, b));


  useEffect(() => {
 
    const backgroundAnimation = anime({
      targets: 'body',
      background: [
        { value: '#FDB813' },
        { value: '#E75A7C' },
        { value: '#A4A4A4' },
        { value: '#00A6ED' },
        { value: '#F95700' },
        { value: '#5A5A5A' },
        { value: '#6BB130' },
        { value: '#E4002B' },
        { value: '#00B7B0' },
        { value: '#FDB813' },
        { value: '#E75A7C' },
        { value: '#A4A4A4' },
        { value: '#00A6ED' },
        { value: '#F95700' },
        { value: '#5A5A5A' },
        { value: '#6BB130' },
        { value: '#E4002B' },
        { value: '#00B7B0' },
      ],
      duration: 100000,
      easing: 'linear',
      loop: true
    }); 
  }, []);
  

  useEffect(() => {
    if (!titleAnimated) {
    
      const titleAnimation = anime({
        targets: '.title',
        translateY: [-50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 9000,
        delay: 500
      });
      titleAnimation.finished.then(() => {
        setTitleAnimated(true);
      });
    }
  }, [titleAnimated]);

  useEffect(() => {
    getItems();
  }, []);

return (
    <>
  
<Container>

<div className="collapsible-nav" onClick={handleOutsideClick}>
  <Button
    variant="link"
    className="nav-toggle"
    onClick={handleToggle}
    aria-expanded={showMenu} >
    <i className="fas fa-bars">≡</i> 
  </Button>
  <Collapse in={showMenu}>
    <div>
      <Nav>
        <div className="add">
          {showMenu && <Add handleCreate={handleCreate} />}
        </div>
      </Nav>
    </div>
  </Collapse>
</div>

<div className="sort-buttons">
  <button onClick={() => handleSort('name')}>
    Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
  </button>
  <button onClick={() => handleSort('price')}>
    Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
  </button>
</div>

 <h1 className="title">ZIGGYS FINDS</h1>
        <Row className="card-row">
        {filteredAndSortedItems.map((item) => (
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
  <footer>
  <p>ZIGGYS FINDS &copy; 2023</p>
  </footer>
    </>
  );
};

export default App;