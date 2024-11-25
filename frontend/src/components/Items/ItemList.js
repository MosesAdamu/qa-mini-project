import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://qa-test-9di7.onrender.com/items');
        setItems(response.data);
      } catch (error) {
        setMessage('Failed to fetch items.');
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      {message && <p>{message}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
