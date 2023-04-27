import React, { useState } from 'react';

const Edit = (props) => {
  const [item, setItem] = useState({ ...props.item });

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdate(item);
  };

  return (
    <>
      <details>
        <br />
        <summary>Edit Item Info</summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={item.name} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" value={item.description} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" value={item.price} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="image_url">Image URL: </label>
          <input type="url" name="image_url" value={item.image_url} onChange={handleChange} />
          <br />
          <br />
          <input type="submit" />
        </form>
      </details>
    </>
  );
};

export default Edit;
