import React, { useState } from 'react';

const Add = (props) => {
  const [item, setItem] = useState({
    name: '',
    color: '',
    price: '',
    size: '',
    description: '',
    photo_url: ''
  });

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('color', item.color);
    formData.append('price', item.price);
    formData.append('size', item.size);
    formData.append('description', item.description);
    formData.append('photo_url', item.photo_url);
    props.handleCreate(formData);
    setItem({
      name: '',
      color: '',
      price: '',
      size: '',
      description: '',
      photo_url: ''
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={item.name} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="color">Color: </label>
        <input type="text" name="color" value={item.color} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="price">Price: </label>
        <input type="number" name="price" value={item.price} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="size">Size: </label>
        <input type="text" name="size" value={item.size} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="photo_url">Photo URL: </label>
        <input type="url" name="photo_url" value={item.photo_url} onChange={handleChange} />
        <br />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Add;
