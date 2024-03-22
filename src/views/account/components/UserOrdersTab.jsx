import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrdersTab = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/productos', {
          userId 
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al solicitar pedidos...');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="loader" style={{ minHeight: '80vh' }}>
        <h3>Mis pedidos</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader" style={{ minHeight: '80vh' }}>
        <h3>Mis pedidos</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="loader" style={{ minHeight: '80vh' }}>
        <h3>Mis pedidos</h3>
        <strong><span className="text-subtle">No tienes ordenes</span></strong>
      </div>
    );
  }

  return (
    <div className="user-orders">
      <h3>Mis pedidos</h3>
      {orders.map((order, index) => (
        <div key={index} className="order-details">
          {Object.keys(order).map(key => (
            <div key={key}>
              <strong>{key}:</strong> {order[key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserOrdersTab;
