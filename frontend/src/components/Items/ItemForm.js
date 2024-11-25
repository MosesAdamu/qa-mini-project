import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ existingItem, onSuccess }) => {
  const [formData, setFormData] = useState(existingItem || { name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingItem) {
        await axios.put(`https://qa-test-9di7.onrender.com/items/${existingItem.id}`, formData);
        setMessage('Item updated successfully!');
      } else {
        await axios.post('https://qa-test-9di7.onrender.com/items', formData);
        setMessage('Item created successfully!');
      }
      onSuccess();
    } catch (error) {
      setMessage('Operation failed.');
    }
  };

  return (
    <div>
      <h2>{existingItem ? 'Edit Item' : 'Create Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{existingItem ? 'Update' : 'Create'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ItemForm;
