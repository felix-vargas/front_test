import { useBasket } from '@/hooks';
import { useEffect, useState } from 'react';

import PropType from 'prop-types';
import React from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';

const ProductGrid = (listaProductos) => {
  const { addToBasket, isItemOnBasket } = useBasket();


  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  
  console.log('Cantidad de productos:',listaProductos.products)
  return (
    <div className="product-grid">
      {listaProductos.products.length === 0 ? new Array(0).fill({}).map((product, index) => (
        <ProductItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          product={product}
        />
      )) : listaProductos.products.map((product) => (
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
