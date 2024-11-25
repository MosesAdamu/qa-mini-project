import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://qa-test-9di7.onrender.com/items/${id}`);
        setItem(response.data);
      } catch (error) {
        setMessage('Failed to fetch item.');
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div>
      {message && <p>{message}</p>}
      {item ? (
        <div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetail;
