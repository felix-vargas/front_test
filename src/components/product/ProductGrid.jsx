import { useBasket } from '@/hooks';
import { useEffect, useState } from 'react';

import PropType from 'prop-types';
import React from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';

const ProductGrid = () => {
  const { addToBasket, isItemOnBasket } = useBasket();


  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/productos');
      setProducts(response.data);
      setRequestStatus(null);
    } catch (error) {
      setRequestStatus({ message: 'Error al obtener productos' });
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.length === 0 ? new Array(12).fill({}).map((product, index) => (
        <ProductItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          product={product}
        />
      )) : products.map((product) => (
        <ProductItem
          key={product.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          product={product}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired
};

export default ProductGrid;
