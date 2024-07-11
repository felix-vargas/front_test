/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '@/selectors/selector';
import { ProductsNavbar } from '../components';
import ProductsTable from '../components/ProducsTable2';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Products = () => {
  useDocumentTitle('Product List | Dolfino Admin');
  useScrollTop();
  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  console.log('Current Store State:', store);

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/productos');
      console.log(response)
      setProducts(response.data);
      setRequestStatus(null);
      setFetching(false);
      store.products=products
    } catch (error) {
      setRequestStatus({ message: 'Error al obtener productos' });
    } finally {
      setLoading(false);

    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products)
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post(`http://localhost:8000/api/delete_product`,{id:productId});
      // Optionally, you can update the products state or refetch products after deletion
      // For example:
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error if needed
    }
  };
  return (
    <Boundary>
      <ProductsNavbar
        productsCount={products.length}  // Use products.length directly for count
        totalProductsCount={store.products.total}  // Assuming total count comes from Redux store
      />
      <div className="product-admin-items">
        <ProductList products={products} isLoading={isLoading} requestStatus={requestStatus}>
          {/* Render ProductsTable or any other components here */}
          <ProductsTable
            products={products}
            onDeleteProduct={handleDeleteProduct}  // Pass delete handler to ProductsTable
          />
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
