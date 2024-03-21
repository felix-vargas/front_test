/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from '@/components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/actions/miscActions';
import { getProducts } from '@/redux/actions/productActions';
import axios from 'axios';

const ProductList = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
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
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.length > 0 && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? 'Buscando productos...' : 'Mostrar mas productos'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: null
};

ProductList.propTypes = {
  products: PropType.object.isRequired,
  filteredProducts: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default ProductList;
